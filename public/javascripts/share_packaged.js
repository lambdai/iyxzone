Iyxzone.Share={version:'1.0',author:['高侠鸿'],getPage:function(link){this.node=new Element('script',{type:'text/javascript',src:'http://www.baidu.com'});var head=$('shared_link');head.appendChild(this.node);alert(this.node.innerHTML);},validateURL:function(url){if(!url.match(/(http:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-%=&]+)?/)){error('非法的url地址');return false;}
return true;},shareLink:function(){var url=$('link').value;if(this.validateURL(url)){new Ajax.Request('/sharings/new',{method:'get',parameters:'shareable_type=Link&link='+url,onSuccess:function(transport){facebox.reveal(transport.responseText);}});}}};Iyxzone.Video={version:'1.0',author:['高侠鸿'],Builder:{},play:function(videoID,videoLink){$('video_'+videoID).innerHTML=videoLink;}};Object.extend(Iyxzone.Video.Builder,{tagBuilder:null,validate:function(){if($('video_title').value==''){error('标题不能为空');return false;}
if($('video_url').value==''){error('url不能为空');return false;}
if(!$('video_url').value.include('youku')){error('现在只有youku的视频才能解析。。慢慢都会有的');return false;}
if($('video_game_id').value==''){error('游戏类别不能为空');return false;}
if($('video_title').length>=100){facebox.show_error('标题太长了，最长100个字符');return false;}
return true;},prepare:function(){var newTags=this.tagBuilder.getNewTags();var delTags=this.tagBuilder.getDelTags();for(var i=0;i<newTags.length;i++){var el=new Element("input",{type:'hidden',value:newTags[i],id:'video[new_friend_tags][]',name:'video[new_friend_tags][]'});$('video_form').appendChild(el);}
for(var i=0;i<delTags.length;i++){var el=new Element("input",{type:'hidden',value:delTags[i],id:'video[del_friend_tags][]',name:'video[del_friend_tags][]'});$('video_form').appendChild(el);}},save:function(button,event){Event.stop(event);if(this.validate()){this.prepare();Iyxzone.disableButtonThree(button,'发布中..');$('video_form').submit();}},update:function(button,event){Event.stop(event);if(this.validate()){this.prepare();Iyxzone.disableButtonThree(button,'更新中..');$('video_form').submit();}}});