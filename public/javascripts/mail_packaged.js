Iyxzone.Mail={version:'1.0',author:['高侠鸿'],Manager:{},Builder:{}};Object.extend(Iyxzone.Mail.Manager,{deselectAllMails:function(){var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].hasClassName('mail-check')){inputs[i].checked=false;}}},selectAllMails:function(){var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].hasClassName('mail-check')){inputs[i].checked=true;}}},selectReadMails:function(){var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].hasClassName('mail-check')&&inputs[i].readAttribute('read')=='true'){inputs[i].checked=true;}}},selectUnreadMails:function(){var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].hasClassName('mail-check')&&inputs[i].readAttribute('read')=='false'){inputs[i].checked=true;}}},onDropdownChange:function(){this.deselectAllMails();var val=$('select').value;if(val=='all'){this.selectAllMails();}else if(val=='none'){}else if(val=='read'){this.selectReadMails();}else if(val=='unread'){this.selectUnreadMails();}},getSelectedMailIDs:function(){var ids=[];var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].hasClassName('mail-check')&&inputs[i].checked){ids.push(inputs[i].readAttribute('mail_id'));}}
return ids;},read:function(authenticity_token){var ids=this.getSelectedMailIDs();var params="";for(var i=0;i<ids.length;i++){params+="ids[]="+ids[i]+"&";}
params+="authenticity_token="+authenticity_token+"&";params+="type=1";new Ajax.Request('/mails/read_multiple',{method:'put',parameters:params,onSuccess:function(transport){for(var i=0;i<ids.length;i++){$('mail_'+ids[i]+'_title').style.fontWeight='';$('mail_'+ids[i]+'_select').writeAttribute({read:'true'});}}});},unread:function(authenticity_token){var ids=this.getSelectedMailIDs();var params="";for(var i=0;i<ids.length;i++){params+="ids[]="+ids[i]+"&";}
params+="authenticity_token="+authenticity_token+"&";params+="type=1";new Ajax.Request('/mails/unread_multiple',{method:'put',parameters:params,onSuccess:function(transport){for(var i=0;i<ids.length;i++){$('mail_'+ids[i]+'_title').style.fontWeight='bold';$('mail_'+ids[i]+'_select').writeAttribute({read:'false'});}}});},destroy:function(authenticity_token,type){var ids=this.getSelectedMailIDs();var params="";for(var i=0;i<ids.length;i++){params+="ids[]="+ids[i]+"&";}
params+="authenticity_token="+authenticity_token+"&";params+="type="+type;new Ajax.Request('/mails/destroy_multiple',{method:'delete',parameters:params});}});Object.extend(Iyxzone.Mail.Builder,{recipientBuilder:null,validate:function(){if(this.recipientBuilder.getNewTags().length==0){error('至少要有1个收件者');return false;}
if($('mail_title').value==''){error('标题不能为空');return false;}
if($('mail_content').value==''){error('内容不能为空');return false;}
return true;},deliver:function(button){if(this.validate()){var newTags=this.recipientBuilder.getNewTags();for(var i=0;i<newTags.length;i++){var el=new Element("input",{type:'hidden',value:newTags[i],id:'recipient_ids[]',name:'recipient_ids[]'});$('mail_form').appendChild(el);}
Iyxzone.disableButton(button,'等待...');$('mail_form').submit();}},});Iyxzone.Friend={version:'1.0',author:['高侠鸿'],Suggestor:{},NicerSuggestor:{},Tagger:Class.create({})};Iyxzone.Comrade={version:'1.0',author:['高侠鸿'],Suggestor:{}};Object.extend(Iyxzone.Friend.Suggestor,{newSuggestion:function(suggestionID,token){var url='friend_suggestions/new';var exceptIDs=[];var suggestions=$('friend_suggestions').childElements();for(var i=0;i<suggestions.length;i++){exceptIDs.push(suggestions[i].readAttribute('suggestion_id'));}
var exceptParam="";for(var i=0;i<exceptIDs.length;i++){exceptParam+="except_ids[]="+exceptIDs[i]+"&";}
url+="?"+exceptParam;new Ajax.Request(url,{method:'get',parameters:{authenticity_token:encodeURIComponent(token)},onSuccess:function(transport){var card=$('friend_suggestion_'+suggestionID);var temp_parent=new Element('div');temp_parent.innerHTML=transport.responseText;var li=temp_parent.childElements()[0];li.hide();Element.replace(card,li);li.appear({duration:3.0});}.bind(this)});}});Object.extend(Iyxzone.Friend.NicerSuggestor,{newSuggestion:function(suggestionID,token){var url='friend_suggestions/new';var exceptIDs=[];var suggestions=$('friend_suggestions').childElements();for(var i=0;i<suggestions.length;i++){exceptIDs.push(suggestions[i].readAttribute('suggestion_id'));}
var exceptParam="";for(var i=0;i<exceptIDs.length;i++){exceptParam+="except_ids[]="+exceptIDs[i]+"&";}
url+="?"+exceptParam;new Ajax.Request(url,{method:'get',parameters:{authenticity_token:encodeURIComponent(token),nicer:1},onSuccess:function(transport){var card=$('friend_suggestion_'+suggestionID);var temp_parent=new Element('div');temp_parent.innerHTML=transport.responseText;var li=temp_parent.childElements()[0];li.hide();Element.replace(card,li);li.appear({duration:3.0});}.bind(this)});}});Object.extend(Iyxzone.Comrade.Suggestor,{newSuggestion:function(serverID,suggestionID,token){var url='friend_suggestions/new';var exceptIDs=[];var suggestions=$('server_'+serverID+'_suggestions').childElements();for(var i=0;i<suggestions.length;i++){exceptIDs.push(suggestions[i].readAttribute('suggestion_id'));}
var exceptParam="";for(var i=0;i<exceptIDs.length;i++){exceptParam+="except_ids[]="+exceptIDs[i]+"&";}
url+="?"+exceptParam;new Ajax.Request(url,{method:'get',parameters:{server_id:serverID,authenticity_token:encodeURIComponent(token)},onSuccess:function(transport){var card=$('comrade_suggestion_'+suggestionID);var temp_parent=new Element('div');temp_parent.innerHTML=transport.responseText;var li=temp_parent.childElements()[0];li.hide();Element.replace(card,li);li.appear({duration:3.0});}.bind(this)});}});Iyxzone.Friend.Autocompleter=Class.create(Autocompleter.Local,{initialize:function($super,element,update,options){options=Object.extend({selector:function(instance){var options=instance.options;var pinyins=options.pinyins;var names=options.names;var ids=options.ids;var token=instance.getToken();var ret=[];for(var i=0;i<pinyins.length;i++){var pinyinPos=options.ignoreCase?pinyins[i].toLowerCase().indexOf(token.toLowerCase()):pinyins[i].indexOf(token);var namePos=options.ignoreCase?names[i].toLowerCase().indexOf(token.toLowerCase()):names[i].indexOf(token);if(pinyinPos>=0||namePos>=0){ret.push('<li style="list-style-type:none;" id='+ids[i]+' ><a href="javascript:void(0)">'+names[i]+'</a></li>');}}
if(ret.length==0){return options.emptyText;}else{return"<ul>"+ret.join('')+"</ul>";}}},options||{});Event.observe(element,'focus',this.showTip.bindAsEventListener(this));$super(element,update,null,options);},showTip:function(){this.update.innerHTML=this.options.tipText;var comp=this.options.comp;this.update.setStyle({position:'absolute',left:comp.positionedOffset().left+'px',top:(comp.positionedOffset().top+comp.getHeight())+'px',width:(comp.getWidth()-10)+'px',maxHeight:'200px',overflow:'auto',padding:'5px',background:'white',border:'1px solid #E7F0E0'});this.update.show();},updateChoices:function($super,data){if(data.indexOf('ul')<0){this.update.innerHTML=data;this.update.show();}else{$super(data);}
var comp=this.options.comp;this.update.setStyle({position:'absolute',left:comp.positionedOffset().left+'px',top:(comp.positionedOffset().top+comp.getHeight())+'px',width:(comp.getWidth()-10)+'px',maxHeight:'200px',overflow:'auto',padding:'5px',background:'white',border:'1px solid #E7F0E0'});}});Iyxzone.Friend.Tagger=Class.create({initialize:function(max,friendIDs,tagIDs,friendNames,toggleButton,input,friendList,friendTable,friendItems,gameSelector,confirmButton,cancelButton){this.max=max;this.tags=new Hash();this.newTags=new Hash();this.delTags=new Array();this.toggleButton=$(toggleButton);this.friendList=$(friendList);this.friendTable=$(friendTable);this.friendItems=$(friendItems);this.confirmButton=$(confirmButton);this.cancelButton=$(cancelButton);this.gameSelector=$(gameSelector);this.taggedUserList=new TextBoxList(input,{onBoxDispose:this.removeBox.bind(this),holderClassName:'friend-select-list s_clear',bitClassName:''});for(var i=0;i<friendIDs.length;i++){var el=this.taggedUserList.add(friendIDs[i],friendNames[i]);this.tags.set(friendIDs[i],[tagIDs[i],el]);}
var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'){inputs[i].checked=false;inputs[i].observe('click',this.afterCheckFriend.bindAsEventListener(this));if(this.tags.keys().include(inputs[i].value)){inputs[i].checked=true;}}}
Event.observe(this.toggleButton,'click',function(e){this.toggleFriends();}.bind(this));Event.observe(this.confirmButton,'click',function(event){Event.stop(event);var checked=new Hash();var delTags=new Array();var newTags=new Array();var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].checked){checked.set(inputs[i].value,{id:inputs[i].value,login:inputs[i].readAttribute('login')});}}
this.tags.keys().each(function(key){if(!checked.keys().include(key)){delTags.push(key);}}.bind(this));this.newTags.keys().each(function(key){if(!checked.keys().include(key)){delTags.push(key);}}.bind(this));this.removeTags(delTags);var tagIDs=this.tags.keys();var newTagIDs=this.newTags.keys();checked.each(function(pair){var input=pair.value;var key=pair.key;if(!tagIDs.include(key)&&!newTagIDs.include(key)){newTags.push(input);}}.bind(this));this.addTags(newTags);this.toggleFriends();}.bind(this));Event.observe(this.cancelButton,'click',function(event){Event.stop(event);this.toggleFriends();}.bind(this));Event.observe(this.gameSelector,'change',function(e){this.getFriends(this.gameSelector.value);}.bind(this));var pinyins=[];var names=[];var ids=[];this.friendItems.childElements().each(function(li){pinyins.push(li.down('input').readAttribute('pinyin'));names.push(li.down('input').readAttribute('login'));ids.push(li.down('input').value);}.bind(this));new Iyxzone.Friend.Autocompleter(this.taggedUserList.getMainInput(),this.friendList,{ids:ids,names:names,pinyins:pinyins,afterUpdateElement:this.afterSelectFriend.bind(this),tipText:'输入你好友的名字或者拼音',emptyText:'没有匹配的好友...',comp:this.taggedUserList.holder,});},removeBox:function(el,input){var friendID=input.value;var tagInfo=this.tags.unset(friendID);if(tagInfo){this.delTags.push(tagInfo[0]);}else{this.newTags.unset(friendID);}
var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].value==friendID){inputs[i].checked=false;}}},removeTags:function(friendIDs){for(var i=0;i<friendIDs.length;i++){var friendID=friendIDs[i];var tagInfo=this.tags.unset(friendID);if(tagInfo){this.delTags.push(tagInfo[0]);tagInfo[1].remove();}else{var div=this.newTags.unset(friendID);div.remove();}}},addTags:function(friends){for(var i=0;i<friends.length;i++){var el=this.taggedUserList.add(friends[i].id,friends[i].login);this.newTags.set(friends[i].id,el);}},getNewTags:function(){return this.newTags.keys();},getDelTags:function(){return this.delTags;},getFriends:function(game_id){var friends=this.friendItems.childElements();friends.each(function(f){var info=f.readAttribute('info').evalJSON();var games=info.games;if(game_id=='all'||games.include(game_id)){f.show();}else{f.hide();}}.bind(this));},toggleFriends:function(){if(!this.friendTable.visible()){var pos=this.toggleButton.positionedOffset();this.friendTable.setStyle({position:'absolute',left:(pos.left+this.toggleButton.getWidth()-this.friendTable.getWidth())+'px',top:(pos.top+this.toggleButton.getHeight())+'px'});this.friendTable.show();}else{this.friendTable.hide();}},afterSelectFriend:function(input,selectedLI){var id=selectedLI.readAttribute('id');var login=selectedLI.childElements()[0].innerHTML;input.clear();if(this.tags.keys().include(id)||this.newTags.keys().include(id)){return;}else{if(this.tags.keys().length+this.newTags.keys().length>=this.max){error('最多选'+this.max+'个!');return;}
this.addTags([{id:id,login:login}]);input.clear();var inputs=$$('input');for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].value==id){inputs[i].checked=true;}}}},afterCheckFriend:function(mouseEvent){var checkbox=mouseEvent.target;if(!checkbox.checked){return;}
var inputs=$$('input');var checked=0;for(var i=0;i<inputs.length;i++){if(inputs[i].type=='checkbox'&&inputs[i].checked)
checked++;}
if(checked>this.max){error('最多选'+this.max+'个!');checkbox.checked=false;return;}},reset:function(tagInfos){this.newTags.each(function(pair){var friendID=pair.key;var div=pair.value;for(var i=0;i<tagInfos.length;i++){if(tagInfos[i].friend_id==friendID){this.tags.set(friendID,[tagInfos[i].id,div])}}}.bind(this));this.delTags=new Array();this.newTags=new Hash();}});Iyxzone.Emotion={version:'1.2',author:['高侠鸿','戴雨宸'],faces:['[惊吓]','[晕]','[流鼻涕]','[挖鼻子]','[鼓掌]','[骷髅]','[坏笑]','[傲慢]','[大哭]','[砸头]','[衰]','[哭]','[可爱]','[冷汗]','[抽烟]','[擦汗]','[亲亲]','[糗]','[吃惊]','[左哼哼]','[疑问]','[惊恐]','[睡觉]','[皱眉头]','[可怜]','[打呵欠]','[害羞]','[花痴]','[右哼哼]','[囧]','[大便]','[咒骂]','[贼笑]','[嘘]','[吐]','[苦恼]','[白眼]','[流汗]','[大笑]','[羞]','[撇嘴]','[偷笑]','[BS]','[困]','[火]','[闭嘴]','[抓狂]','[强]','[不行]','[装酷]'],facesCount:50,facesPerPage:32,Manager:{}};Object.extend(Iyxzone.Emotion.Manager,{currentField:null,currentLink:null,facesSingle:null,facePages:[],constructFacesTable:function(link,textField){if(textField==null)return;var rows=Iyxzone.Emotion.rows;var myFaces=Iyxzone.Emotion.faces;var facesPerPage=Iyxzone.Emotion.facesPerPage;var facesCount=Iyxzone.Emotion.facesCount;var a,img,pageIndex=-1;this.facesSingle=new Element('div',{class:"emot-box drop-wrap"});for(var i=0;i<facesCount;i++){if(i%facesPerPage==0){pageIndex++;this.facePages[pageIndex]=new Element('div',{class:"con"});}
a=new Element('a',{title:myFaces[i],href:'javascript: void(0)'});img=new Element('img',{src:"/images/faces/"+myFaces[i].slice(1,myFaces[i].length-1)+".gif",alt:myFaces[i],index:i});a.appendChild(img);a.observe('click',function(e){var idx=parseInt(e.element().readAttribute('index'));this.currentField.value+=myFaces[idx];this.toggleFaces(this.currentLink,this.currentField,e);}.bind(this));this.facePages[pageIndex].appendChild(a);}
for(var i=0;i<this.facePages.length;i++){var prev=new Element('a',{class:'prev',pageNum:i});if(i!=0){prev.observe('click',function(e){Event.stop(e);var el=e.element();var pageTo=parseInt(el.readAttribute('pageNum'))-1;this.facesSingle.appendChild(this.facePages[pageTo]);this.facesSingle.removeChild(el.up().up());}.bind(this));}else{prev.writeAttribute({class:'first'});prev.observe('click',function(e){Event.stop(e);}.bind(this));}
var next=new Element('a',{class:'next',pageNum:i});if(i!=this.facePages.length-1){next.observe('click',function(e){Event.stop(e);var el=e.element();var pageTo=parseInt(el.readAttribute("pageNum"))+1;this.facesSingle.appendChild(this.facePages[pageTo]);this.facesSingle.removeChild(el.up().up());}.bind(this));}else{next.writeAttribute({class:'last'});next.observe('click',function(e){Event.stop(e);}.bind(this));}
var foot=new Element('div',{class:'pager-simple foot'});var pagenum=new Element('span').update(i+1);foot.appendChild(prev);foot.appendChild(pagenum);foot.appendChild(next);this.facePages[i].appendChild(foot);}
this.facesSingle.appendChild(this.facePages[0]);document.body.appendChild(this.facesSingle);this.setFaceStyle(link,textField);},setFaceStyle:function(link,textField){this.currentLink=link;this.facesSingle.setStyle({"position":'absolute',"left":(link.cumulativeOffset().left)+'px',"top":(link.cumulativeOffset().top)+'px',"width":'244px',});this.currentField=textField;this.currentLink=link;},toggleFaces:function(link,textField,event){Event.stop(event);if(!this.facesSingle){this.constructFacesTable(link,textField);this.currentField=textField;this.currentLink=link;this.facesSingle.show();}else{if(this.currentLink==link&&this.facesSingle.visible()){this.facesSingle.hide();}else{this.setFaceStyle(link,textField);this.facesSingle.removeChild(this.facesSingle.firstChild);this.facesSingle.appendChild(this.facePages[0]);this.facesSingle.show();}}}});document.observe('dom:loaded',function(){document.body.observe('click',function(){if(Iyxzone.Emotion.Manager.facesSingle){Iyxzone.Emotion.Manager.facesSingle.hide();}});});ResizableTextBox=Class.create({initialize:function(element,options){this.options=Object.extend({min:20,max:500,step:7,},options||{});this.element=element;this.element.setStyle({width:this.options.min});Event.observe(this.element,'keyup',function(){var newSize=this.options.step*this.element.value.length;if(newSize>=this.options.max)
newSize=this.options.max;else if(newSize<=this.options.min)
newSize=this.options.min;else
newSize=newSize;this.element.setStyle({width:newSize+'px'});}.bind(this));},reset:function(){this.element.setStyle({width:this.options.min+'px'});}});TextBoxList=Class.create({initialize:function(element,options){this.options=Object.extend({holderClassName:'holder',bitClassName:'bit-box',paramName:'value[]',onMainInputFocus:Prototype.emptyFunction,onMainInputBlur:Prototype.emptyFunction,onBoxFocus:Prototype.emptyFunction,onBoxBlur:Prototype.emptyFunction,onBoxDispose:Prototype.emptyFunction},options||{});this.count=0;this.el=$(element);this.bits=new Hash();this.current=false;this.mainInput=this.createMainInput();this.holder=new Element('ul',{class:this.options.holderClassName});this.el.hide();this.holder.appendChild(this.mainInput);Element.insert(this.el,{before:this.holder});this.resizableMainInput=new ResizableTextBox(this.inputTextField,{max:(this.holder.getWidth()||100)});Event.observe(this.mainInput,'click',function(e){this.mainInputFocus();Event.stop(e);}.bind(this));Event.observe(this.holder,'click',function(e){this.inputTextField.focus();this.mainInputFocus();Event.stop(e);}.bind(this));Event.observe(document,'keydown',function(e){}.bind(this));Event.observe(document,'keyup',function(e){switch(e.keyCode){case 37:if(!this.current||this.current==this.mainInput)return;this.boxFocus(this.getPrevious(this.current));break;case 39:if(!this.current||this.current==this.mainInput)return;this.boxFocus(this.getNext(this.current));break;case 8:if(!this.current||this.current==this.mainInput)return;this.dispose(this.current,e.keyCode);break;case 46:if(!this.current||this.current==this.mainInput)return;this.dispose(this.current,e.keyCode);break;}}.bind(this));Event.observe(document,'click',function(e){this.boxBlur();}.bind(this));},add:function(val,text){var id='bit-'+this.count++;var el=this.createBox(text,{id:id});Element.insert(this.mainInput,{before:el});var input=this.createInput({value:val});Element.insert(el,{before:input});input.hide();Event.observe(el,'click',function(e){this.boxFocus(el);Event.stop(e);}.bind(this));this.bits.set(id,text);this.resizableMainInput.reset();return el;},createBox:function(text,options){var li=new Element('li',Object.extend({class:this.options.bitClassName},options||{}));var a=new Element('a');var span=new Element('span').update(text);var em=new Element('em',{class:'x'});span.appendChild(em);a.appendChild(span);li.appendChild(a);Event.observe(em,'click',function(e){this.dispose(e.element().up().up().up());Event.stop(e);}.bind(this));return li;},createMainInput:function(){var li=new Element('li',{width:'100%'});var el=new Element('input',{type:'text'});li.appendChild(el);this.inputTextField=el;return li;},createInput:function(options){var li=new Element('li',{class:this.options.bitClassName});var el=new Element('input',Object.extend({type:'text',name:this.options.paramName},options||{}));li.appendChild(el);return li;},mainInputFocus:function(){if(this.mainInput==this.current)
return;if(this.current){this.boxBlur();}
this.current=this.mainInput;this.options.onMainInputFocus(this.getMainInput());},mainInputBlur:function(){if(this.current==this.mainInput){this.current=false;this.options.onMainInputBlur(this.getMainInput());}},boxFocus:function(el){if(this.current==el)
return;if(this.current==this.mainInput){this.mainInputBlur();}else if(this.current){this.boxBlur(this.current);}
el.addClassName('bit-focus');this.current=el;this.options.onBoxFocus(el);},boxBlur:function(){if(this.current&&this.mainInput!=this.current)
this.current.className=this.options.bitClassName;this.current=false;this.options.onBoxBlur(this.current);},getPrevious:function(el){if(el.previous().previous()==null)
return el;else
return el.previous().previous();},getNext:function(el){if(el.next()==this.mainInput)
return el;else
return el.next().next();},dispose:function(el,keyCode){var del=null;if(keyCode==null){if(this.current==el)
this.current=false;del=el;}else{if(!this.current)
return;if(this.current!=this.mainInput){del=this.current;this.current=false;}else if(this.getMainInput().value==''){if(this.mainInput.previous()==null)
return;else
el=this.mainInput.previous();}}
this.bits.unset(el.id);this.options.onBoxDispose(el,el.previous().childElements()[0]);if(el.previous()){el.previous().remove();}
el.remove();},disposeAll:function(){this.bits.each(function(pair){this.dispose($(pair.key),null);}.bind(this));this.bits=new Hash();},getMainInput:function(){return this.inputTextField;},getValues:function(){var inputs=$$('input');var values=[];for(var i=0;i<inputs.length;i++){if(inputs[i].type=='text'&&inputs[i].hasClassName('smallInput')){values.push(inputs[i].value);}}
return values;}});