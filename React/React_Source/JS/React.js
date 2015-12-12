function ReactCompositeComponent(element){
    this._currentElement = element;
    this._rootNodeID= null;
    this._instance=  null;
}


ReactCompositeComponent.prototype.mountComponent = function(rootID){
    this._rootNodeID = rootID;

    var publicProps = this._currentElement.props;

    var ReactClass = this._currentElement.type;

    var inst = new ReactClass(publicProps);

    this._instance = inst;

    inst._reactInternalInstance = this;

    if(inst.componentWillMount){
        inst.componentWillMount();
    }

    var renderedElement = this._instance.render();

    var renderedComponentInstance = instantiateReactComponent(renderedElement);
    this._renderedComponent = renderedComponentInstance; //存起来留作后用

    //拿到渲染之后的字符串内容，将当前的_rootNodeID传给render出的节点
    var renderedMarkup = renderedComponentInstance.mountComponent(this._rootNodeID);

    //之前我们在React.render方法最后触发了mountReady事件，所以这里可以监听，在渲染完成后会触发。
    $(document).on('mountReady', function() {
        //调用inst.componentDidMount
        inst.componentDidMount && inst.componentDidMount();
    });

    return renderedMarkup;
}

ReactCompositeComponent.prototype.receiveComponent  = function(nextElement, newState){
    this._currentElement = nextElement || this._currentElement;

    var inst = this._instance;

    var nextState = $.extend(inst.state,newState);

    var nextProps = this._currentElement.props;

    inst.state=nextState;
    if (inst.shouldComponentUpdate && (inst.shouldComponentUpdate(nextProps, nextState) === false)) return;

    if (inst.componentWillUpdate) inst.componentWillUpdate(nextProps, nextState);

    var prevComponentInstance  =this._renderedComponent;
    var preRenderedElement= prevComponentInstance._currentElement;

    var nextRenderedElement = this._instance.render();

     if (_shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
        prevComponentInstance.receiveComponent(nextRenderedElement);
        inst.componentDidUpdate && inst.componentDidUpdate();

    } else {
        var thisID = this._rootNodeID;
        this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
        var nextMarkup = _renderedComponent.mountComponent(thisID);
        $('[data-reactid="' + this._rootNodeID + '"]').replaceWith(nextMarkup);
    }
}

var _shouldUpdateReactComponent ＝ function(prevElement, nextElement){
    if (prevElement != null && nextElement != null) {
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if (prevType === 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }
  return false;
}


ReactDOMTextComponent.prototype.receiveComponent = function(nextText) {
    var nextStringText = '' + nextText;
    //跟以前保存的字符串比较
    if (nextStringText !== this._currentElement) {
        this._currentElement = nextStringText;
        //替换整个节点
        $('[data-reactid="' + this._rootNodeID + '"]').html(this._currentElement);

    }
}

function ReactElement(type,key,props){
    this.type = type;
    this.key=key;
    this.props = props;
}


//component类，用来表示文本在渲染，更新，删除时应该做些什么事情
function ReactDOMTextComponent(text) {
    //存下当前的字符串
    this._currentElement = '' + text;
    //用来标识当前component
    this._rootNodeID = null;
}

//component渲染时生成的dom结构
ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeID = rootID;
    return '<span data-reactid="' + rootID + '">' + this._currentElement + '</span>';
}


//component工厂  用来返回一个component实例
function instantiateReactComponent(node){
    if(typeof node === 'string' || typeof node === 'number'){
        return new ReactDOMTextComponent(node)
    }

    if(typeof node === 'object' && typeof node.type ==='string'){
        return new ReactDOMComponent(node);
    }

    if(typeof node === 'object' && typeof node.type ==='function'){
        return new ReactCompositeComponent(node);
    }
}

function ReactDOMComponent(element){
    this._currentElement = element;
    this._rootNodeID=null;
}


ReactDOMComponent.prototype.mountComponent = function(rootID) {
    this._rootNodeID = rootID;

    var props = this._currentElement.props;

    var tagOpen ='<' +this._currentElement.type;
    var tagClose = '</' + this._currentElement.type +'>';

    tagOpen += ' data-reactid'+ this._rootNodeID;

    for(var propKey in props){
        if (/^on[A-Za-z]/.test(propKey)) {
            var eventType = propKey.replace('on', '');
            //针对当前的节点添加事件代理,以_rootNodeID为命名空间
            $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, props[propKey]);
        }

        if(props[propKey] && propKey !='children' && !/^on[A-Za-z]/.test(propKey)){
            tagOpen += ' ' + propKey + '=' +props[propKey];
        }
    }
    
    var content = '';
    var children = props.children ||[];

    var childrenInstances = [];

    var that  = this;

    $.each(children,function(key,child){
        //这里再次调用了instantiateReactComponent实例化子节点component类，拼接好返回
        var childComponentInstance = instantiateReactComponent(child);
        childComponentInstance._mountIndex = key;

        childrenInstances.push(childComponentInstance);
        //子节点的rootId是父节点的rootId加上新的key也就是顺序的值拼成的新值
        var curRootId = that._rootNodeID + '.' + key;
        //得到子节点的渲染内容
        var childMarkup = childComponentInstance.mountComponent(curRootId);
        //拼接在一起
        content += ' ' + childMarkup;
    })

    this._renderedChildren = childrenInstances;

    return tagOpen + '>' + content  + tagClose;
}


var ReactClass = function(){};


ReactClass.prototype.render = function(){

}

ReactClass.setState=  function(newState){
    this._reactInternalInstance.receiveComponent(null,newState);
}


React = {
    nextReactRootIndex:0,
    render:function(element,container){

        var componentInstance = instantiateReactComponent(element);
        var markup = componentInstance.mountComponent(React.nextReactRootIndex++);
        $(container).html(markup);
        //触发完成mount的事件
        $(document).trigger('mountReady');    
    },
    createClass :function(spec){
        var Constructor = function(props){
            this.props = props;
            this.state= this.getInitialState ? this.getInitialState() : null;
        }

        Constructor.prototype = new ReactClass();
        Constructor.prototype.Constructor = Constructor;

        $.extend(Constructor.prototype,spec);
        return Constructor;
    },
    createElement:function(type,config,children){
        var props = {}, propName;

        config = config ||{};

        var key = config.key ||null;

        for(propName in config){
            if(config.hasOwnProperty(propName) && propName!== 'key'){
                props[propName] = config[propName];
            }
        }

        var childrenLength = arguments.length -2 ;

        if(childrenLength ==1 ){
            props.children = $.isArray(children) ? children : [children] ;
        }
        else if(childrenLength >1 ){
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
        }

        return new ReactElement(type, key, props);
    }
}