(this.webpackJsonptft_client=this.webpackJsonptft_client||[]).push([[0],{113:function(t,e,a){t.exports=a(139)},118:function(t,e,a){},136:function(t,e,a){},139:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),o=a(99),s=a.n(o),i=(a(118),a(51)),l=a(52),c=a(53),p=a(56),u=a(55),d=a(2),h=(a(37),a(136),a(151));var f=function(t,e,a,r,n){var o=t.filter((function(t){return t.player===e})),s=t.filter((function(t){return t.player===r})),i=t.filter((function(t){return t.player===a})),l=t.filter((function(t){return t.player!==e&&t.player!==a&&t.player!==r})),c=o.map((function(t){return{date:t.date,val:t[n],dateLabel:t.dateLabel}})),p=s.map((function(t){return{date:t.date,val:t[n],dateLabel:t.dateLabel}})),u=i.map((function(t){return{date:t.date,val:t[n],dateLabel:t.dateLabel}})),h=l.map((function(t){return{date:t.date,val:t[n],dateLabel:t.dateLabel}}));function f(t){for(var e=[],a=0,r=0,n="",o=[],s=0;s<t.length;s++)s===t.length-1?(o.push(t[s].val),r=d.f(o),e.push({date:a,val:r,dateLabel:n})):0===s?(a=t[s].date,o=[t[s].val],n=t[s].dateLabel):t[s].dateLabel===n?o.push(t[s].val):(o.push(t[s].val),r=d.f(o),e.push({date:a,val:r,dateLabel:n}),a=t[s].date,r=0,o=[t[s].val],n=t[s].dateLabel);return e}var m=f(c),g=f(p);return{z:f(u),a:g,w:m,o:f(h)}};var m=function(t){var e=t.state.walterId,a=t.state.alecId,r=t.state.zachId,n=t.state.height,o=t.state.width,s=t.state.margin,i=t.state.stats;i=i.map((function(t){var e=t;return e.goals=parseFloat(e.goals),e}));var l=f(i,e,r,a,"goals"),c=d.g().domain(l.w.map((function(t){var e=new Date(parseInt(t.date));return e.getMonth()+1+"/"+e.getDate()}))).range([s.left,o-s.right]),p=d.h().domain([0,d.e(l.w,(function(t){return t.val}))]).range([n-s.bottom,s.top]).interpolate(d.c);d.i(t.xRef.current).call((function(t){return t.attr("transform","translate(0, "+(n-s.bottom)+")").call(d.a(c).ticks(o).tickSizeOuter(0))})).node(),d.i(t.yRef.current).call((function(t){return t.attr("transform","translate("+s.left+", 0)").call(d.b(p).ticks(o/80).tickSizeOuter(0))})).node()},g=a(12);var v=function(t){var e=t.props.props.walterId,a=t.props.props.alecId,r=t.props.props.zachId,n=t.props.props.height,o=t.props.props.width,s=t.props.props.margin,i=t.props.props.stats,l=t.props.attribute,c=f(i,e,r,a,l),p=d.g().domain(c.w.map((function(t){var e=new Date(parseInt(t.date));return e.getMonth()+1+"/"+e.getDate()}))).range([s.left,o-s.right]),u=d.h().domain([0,d.e([].concat(Object(g.a)(c.z),Object(g.a)(c.a),Object(g.a)(c.w),Object(g.a)(c.o)),(function(t){return t.val}))]).range([n-s.bottom,s.top]).interpolate(d.c);d.i(t.xRef.current).call((function(t){return t.attr("transform","translate(0, "+(n-s.bottom)+")").call(d.a(p).ticks(o).tickSizeOuter(0))})).node(),d.i(t.yRef.current).call((function(t){return t.attr("transform","translate("+s.left+", 0)").call(d.b(u).ticks(o/80).tickSizeOuter(0))})).node()},b=function(t){Object(p.a)(a,t);var e=Object(u.a)(a);function a(t){var r;return Object(i.a)(this,a),(r=e.call(this,t)).xRef=n.a.createRef(),r.yRef=n.a.createRef(),r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){v(this)}},{key:"render",value:function(){var t=this.props.props.walterId,e=this.props.props.alecId,a=this.props.props.zachId,r=this.props.props.loading,o=this.props.props.error,s=this.props.props.stats,i=this.props.props.height,l=this.props.props.width,c=this.props.props.margin,p=this.props.attribute,u=f(s,t,a,e,p),h=d.d().x((function(t){return m(t.date)+m.bandwidth()/2})).y((function(t){return v(t.val)})),m=d.g().domain(u.w.map((function(t){return t.date}))).range([c.left,l-c.right]),v=d.h().domain([0,d.e([].concat(Object(g.a)(u.z),Object(g.a)(u.a),Object(g.a)(u.w),Object(g.a)(u.o)),(function(t){return t.val}))]).range([i-c.bottom,c.top]).interpolate(d.c),b=h(u.w),w=h(u.a),y=h(u.z),k=h(u.o);return r?n.a.createElement("p",null,"Loading..."):o?n.a.createElement("p",null,"There was an error"):n.a.createElement("div",null,n.a.createElement("h3",null,"average ",p," per game per day"),n.a.createElement("svg",{viewBox:"0 0 1200 400",style:{maxWidth:l+"px",font:"12px sans-serif"}},n.a.createElement("path",{d:b,fill:"none",stroke:"steelblue",strokeWidth:"1.5",strokeMiterlimit:"1"}),n.a.createElement("path",{d:w,fill:"none",stroke:"red",strokeWidth:"1.5",strokeMiterlimit:"1"}),n.a.createElement("path",{d:y,fill:"none",stroke:"green",strokeWidth:"1.5",strokeMiterlimit:"1"}),n.a.createElement("path",{d:k,fill:"none",stroke:"lightgray",strokeWidth:"1.5",strokeMiterlimit:"1"}),n.a.createElement("g",{ref:this.xRef}),n.a.createElement("g",{ref:this.yRef})))}}]),a}(n.a.Component),w=function(t){Object(p.a)(a,t);var e=Object(u.a)(a);function a(t){var r;return Object(i.a)(this,a),(r=e.call(this,t)).state={loading:!0,stats:[],error:!1,height:400,width:1200,margin:{left:30,top:30,right:30,bottom:30},alecId:"76561198160373236",walterId:"76561198032655243",zachId:"76561198065784767"},r.xRef=n.a.createRef(),r.yRef=n.a.createRef(),r.useStyles=r.useStyles.bind(Object(c.a)(r)),r}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var t=this;fetch("https://still-anchorage-53867.herokuapp.com/stats").then((function(t){return t.json()})).then((function(e){var a=e.results;a.sort((function(t,e){return parseInt(t.date)-parseInt(e.date)})),a=a.map((function(t){var e=new Date(parseInt(t.date));return t.dateLabel=e.getMonth()+1+"/"+e.getDate(),t})),t.setState({loading:!1,stats:a}),m(t)})).catch((function(e){console.error(e.message),t.setState({error:!0})}))}},{key:"useStyles",value:function(t){Object(h.a)((function(t){return{root:{flexGrow:1},paper:{padding:t.spacing(2),textAlign:"center",color:t.palette.text.secondary}}}))}},{key:"render",value:function(){var t=this.state.walterId,e=this.state.alecId,a=this.state.zachId,r=this.state.loading,o=this.state.stats;o=o.map((function(t){var e=t;return e.goals=parseFloat(e.goals),e}));var s=this.state.error,i=this.useStyles,l=this.state.height,c=this.state.width,p=this.state.margin,u=f(o,t,a,e,"goals"),h=d.d().x((function(t){return m(t.date)+m.bandwidth()/2})).y((function(t){return g(t.val)})),m=d.g().domain(u.w.map((function(t){return t.date}))).range([p.left,c-p.right]),g=d.h().domain([0,d.e(u.w,(function(t){return t.val}))]).range([l-p.bottom,p.top]).interpolate(d.c);h(u.w),h(u.a),h(u.z),h(u.o),d.d().x((function(t){return m(t.date)+m.bandwidth()/2})).y((function(t){return g(t.shots)}));return r?n.a.createElement("p",null,"Loading..."):s?n.a.createElement("p",null,"There was an error"):n.a.createElement("div",{className:i.root,style:{padding:20}},n.a.createElement("p",null,"Walter = blue"),n.a.createElement("p",null,"Zach = green"),n.a.createElement("p",null,"Alec = red"),n.a.createElement("p",null,"Opponents = gray"),n.a.createElement(b,{props:this.state,attribute:"goals"}),n.a.createElement(b,{props:this.state,attribute:"assists"}),n.a.createElement(b,{props:this.state,attribute:"shots"}),n.a.createElement(b,{props:this.state,attribute:"saves"}))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[113,1,2]]]);
//# sourceMappingURL=main.188e5156.chunk.js.map