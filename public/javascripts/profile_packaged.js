Iyxzone.Profile={version:'1.0',author:['高侠鸿'],Editor:{},Feeder:{},Tag:{}};Object.extend(Iyxzone.Profile.Editor,{loading:function(div,title){div.innerHTML='<div class="edit-toggle space edit"><h3 class="s_clear"><strong class="left">'+title+'</strong><a href="#" class="right">取消</a></h3><div class="formcontent con con2"><img src="/images/loading.gif"/></div></div>';},showError:function(div,content){var span=new Element('span',{"class":'icon-warn'});$(div).update(content);Element.insert($(div),{"top":span});},clearError:function(div){$(div).innerHTML='';},regionSelector:null,setRegionSelector:function(regionID,cityID,districtID){this.regionSelector=new Iyxzone.ChineseRegion.Selector(regionID,cityID,districtID);},basicInfoHTML:null,editBasicInfoHTML:null,isEditingBasicInfo:false,editBasicInfo:function(profileID){if(this.isEditingBasicInfo)
return;else
this.isEditingBasicInfo=true;var frame=$('basic_info_frame');this.basicInfoHTML=frame.innerHTML;if(this.editBasicInfoHTML){frame.innerHTML=this.editBasicInfoHTML;this.regionSelector.setEvents();}else{new Ajax.Updater('basic_info_frame','/profiles/'+profileID+'/edit?type=1',{method:'get',evalScripts:true,onLoading:function(){this.loading(frame,'基本信息');}.bind(this),onSuccess:function(transport){this.editBasicInfoHTML=transport.responseText;}.bind(this)});}},cancelEditBasicInfo:function(){$('basic_info_frame').innerHTML=this.basicInfoHTML;this.isEditingBasicInfo=false;},isLoginValid:function(){var login=$('profile_login');this.clearError('login_error');if(login.value==''){this.showError('login_error','昵称不能为空');return false;}
if(login.value.length<6){this.showError('login_error','昵称至少要4个字符');return false;}
if(login.value.length>16){this.showError('login_error','昵称最多16个字符');return false;}
first=login.value[0];if((first>='a'&&first<='z')||(first>='A'&&first<='Z')){if(!login.value.match(/[A-Za-z0-9\_]+/)){this.showError('login_error','昵称只允许字母和数字');return false;}}else{this.showError('login_error','昵称必须以字母开头');return false;}
return true;},validateBasicInfo:function(){return this.isLoginValid();},updateBasicInfo:function(profileID,button,event){Event.stop(event);if(this.validateBasicInfo()){new Ajax.Request('/profiles/'+profileID+'?type=1',{method:'put',parameters:$('basic_info_form').serialize(),onLoading:function(){Iyxzone.disableButton(button,'请等待..');},onComplete:function(){Iyxzone.enableButton(button,'保存');},onSuccess:function(transport){$('basic_info_frame').innerHTML=transport.responseText;this.isEditingBasicInfo=false;this.editBasicInfoHTML=null;this.regionSelector=null;}.bind(this)});}},contactInfoHTML:null,editContactInfoHTML:null,isEditingContactInfo:false,editContactInfo:function(profileID){if(this.isEditingContactInfo)
return;else
this.isEditingContactInfo=true;var frame=$('contact_info_frame');this.contactInfoHTML=frame.innerHTML;if(this.editContactInfoHTML){frame.innerHTML=this.editContactInfoHTML;facebox.watchClickEvents();}else{new Ajax.Request('/profiles/'+profileID+'/edit?type=2',{method:'get',onLoading:function(){this.loading(frame,'联系信息');}.bind(this),onSuccess:function(transport){this.editContactInfoHTML=transport.responseText;$('contact_info_frame').innerHTML=transport.responseText;facebox.watchClickEvents();}.bind(this)});}},cancelEditContactInfo:function(){$('contact_info_frame').innerHTML=this.contactInfoHTML;this.isEditingContactInfo=false;},isQQValid:function(){var qq=$('profile_qq').value;this.clearError('qq_error');if(qq!=''){if(qq.match(/\d+/)){if(qq.length<4||qq.length>15){this.showError('qq_error','qq号码长度不对');return false;}}else{this.showError('qq_error','qq号码只能由数字组成');return false;}}
return true;},isPhoneValid:function(){var phone=$('profile_phone').value;this.clearError('phone_error');if(phone!=''){if(phone.match(/\d+/)){if(phone.length<8||phone.length>15){this.showError('phone_error','联系电话长度不对');return false;}}else{this.showError('phone_error','联系电话只能由数字组成');return false;}}
return true;},isUrlValid:function(){var url=$('profile_website').value;this.clearError('url_error');if(url!=''){if(!url.match(/^((https?:\/\/)?)(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/)){this.showError('url_error','非法的url地址');return false;}}
return true;},validateContactInfo:function(){var v1=this.isQQValid();var v2=this.isPhoneValid();var v3=this.isUrlValid();return v1&&v2&&v3;},updateContactInfo:function(profileID,button,event){Event.stop(event);if(this.validateContactInfo()){new Ajax.Request('/profiles/'+profileID+'?type=2',{method:'put',parameters:$('contact_info_form').serialize(),onLoading:function(){Iyxzone.disableButton(button,'请等待..');}.bind(this),onComplete:function(){Iyxzone.enableButton(button,'保存');}.bind(this),onSuccess:function(transport){this.editContactInfoHTML=null;$('contact_info_frame').innerHTML=transport.responseText;this.isEditingContactInfo=false;}.bind(this)});}},charactersHTML:null,editCharactersHTML:null,newCharacterID:1,isEditingCharacters:false,gameSelectors:new Hash(),newGameSelectors:new Hash(),delCharacterIDs:new Array(),addGameSelector:function(characterID,gameDetails){var prefix='profile_existing_characters_'+characterID+'_';var selector=new Iyxzone.Game.PinyinSelector(prefix+'game_id',prefix+'area_id',prefix+'server_id',prefix+'race_id',prefix+'profession_id',gameDetails,{});this.gameSelectors.set("existing_"+characterID,selector);},editCharacters:function(profileID){if(this.isEditingCharacters)
return
else
this.isEditingCharacters=true
var frame=$('character_frame');this.charactersHTML=frame.innerHTML;if(this.editCharactersHTML){frame.innerHTML=this.editCharactersHTML;this.gameSelectors.values().each(function(selector){selector.setEvents();});}else{new Ajax.Updater('character_frame','/profiles/'+profileID+'/edit?type=3',{method:'get',evalScripts:true,onLoading:function(){this.loading(frame,'游戏角色信息');}.bind(this),onSuccess:function(transport){this.editCharactersHTML=transport.responseText;}.bind(this)});}},cancelEditCharacters:function(){$('character_frame').innerHTML=this.charactersHTML;this.isEditingCharacters=false;this.delCharacterIDs=new Array();this.newGameSelectors=new Hash();},newCharacter:function(){var id=this.newCharacterID;var div=new Element('div',{id:'new_character_'+id});var html='<div class="rows s_clear"><div class="fldid"><label>名字：</label></div><div class="fldvalue"><div class="textfield"><input type="text" size="30" onblur="Iyxzone.Profile.Editor.isCharacterNameValid('+id+', 1)" name="profile[new_characters]['+id+'][name]" id="profile_new_characters_'+id+'_name"/></div></div><span id="new_character_'+id+'_name_error" class="red"/></div>';html+='<div class="rows s_clear"><div class="fldid"><label>等级：</label></div><div class="fldvalue"><div class="textfield"><input type="text" size="30" onblur="Iyxzone.Profile.Editor.isCharacterLevelValid('+id+', 1)" name="profile[new_characters]['+id+'][level]" id="profile_new_characters_'+id+'_level"/></div></div><span id="new_character_'+id+'_level_error" class="red"/></div>';html+='<div class="rows s_clear"><div class="fldid"><label>游戏：</label></div><div class="fldvalue"><div><select name="profile[new_characters]['+id+'][game_id]" id="profile_new_characters_'+id+'_game_id"><option value="">---</option></select></div></div><span id="new_character_'+id+'_game_id_error" class="red"/></div>';html+='<div class="rows s_clear"><div class="fldid"><label>服务区：</label></div><div class="fldvalue"><div><select name="profile[new_characters]['+id+'][area_id]" id="profile_new_characters_'+id+'_area_id"><option value="">---</option></select></div></div><span id="new_character_'+id+'_area_id_error" class="red"/></div>';html+='<div class="rows s_clear"><div class="fldid"><label>服务器：</label></div><div class="fldvalue"><div><select name="profile[new_characters]['+id+'][server_id]" id="profile_new_characters_'+id+'_server_id"><option value="">---</option></select></div></div><span id="new_character_'+id+'_server_id_error" class="red"/></div>';html+='<div class="rows s_clear"><div class="fldid"><label>种族：</label></div><div class="fldvalue"><div><select name="profile[new_characters]['+id+'][race_id]" id="profile_new_characters_'+id+'_race_id"><option value="">---</option></select></div></div><span id="new_character_'+id+'_race_id_error" class="red"/></div>';html+='<div class="rows s_clear"><div class="fldid"><label>职业：</label></div><div class="fldvalue"><div><select name="profile[new_characters]['+id+'][profession_id]" id="profile_new_characters_'+id+'_profession_id"><option value="">---</option></select></div></div><span id="new_character_'+id+'_profession_id_error" class="red"/></div>';html+='<p class="foot s_clear"><a onclick="Iyxzone.Profile.Editor.removeCharacter('+id+', 1, this);; return false;" href="javascript: void(0)" class="right red">删除角色</a></p>';div.innerHTML=html;$('user_characters').appendChild(div);this.newCharacterID++;var prefix='profile_new_characters_'+id+'_';var selector=Iyxzone.Game.initPinyinSelector(prefix+'game_id',prefix+'area_id',prefix+'server_id',prefix+'race_id',prefix+'profession_id',true,null,{});this.newGameSelectors.set("new_"+id,selector);},isCharacterNameValid:function(characterID,newCharacter){if(newCharacter)
prefix='new';else
prefix='existing';var name=$('profile_'+prefix+'_characters_'+characterID+'_name').value;var div=prefix+'_character_'+characterID+'_name_error';this.clearError(div);if(name.length==''){this.showError(div,'游戏角色的名称不能为空');return false;}
return true},isCharacterLevelValid:function(characterID,newCharacter){if(newCharacter)
prefix='new';else
prefix='existing';var level=$('profile_'+prefix+'_characters_'+characterID+'_level').value;var div=prefix+'_character_'+characterID+'_level_error';this.clearError(div);if(level==''){this.showError(div,'等级不能为空');return false;}
if(!parseInt(level)){this.showError(div,'等级必须是数字');return false;}
return true;},isGameValid:function(characterID,newCharacter){var valid=true;if(newCharacter)
prefix='new';else
prefix='existing';var gameID=$('profile_'+prefix+'_characters_'+characterID+'_game_id').value;var gameDiv=prefix+'_character_'+characterID+'_game_id_error';var areaID=$('profile_'+prefix+'_characters_'+characterID+'_area_id').value;var areaDiv=prefix+'_character_'+characterID+'_area_id_error';var serverID=$('profile_'+prefix+'_characters_'+characterID+'_server_id').value;var serverDiv=prefix+'_character_'+characterID+'_server_id_error';var raceID=$('profile_'+prefix+'_characters_'+characterID+'_race_id').value;var raceDiv=prefix+'_character_'+characterID+'_race_id_error';var professionID=$('profile_'+prefix+'_characters_'+characterID+'_profession_id').value;var professionDiv=prefix+'_character_'+characterID+'_profession_id_error';var game=null;if(newCharacter)
game=this.newGameSelectors.get(prefix+'_'+characterID).getDetails();else
game=this.gameSelectors.get(prefix+'_'+characterID).getDetails();this.clearError(gameDiv);this.clearError(areaDiv);this.clearError(serverDiv);this.clearError(raceDiv);this.clearError(professionDiv);if(gameID==''){this.showError(gameDiv,"请选择游戏");valid=false;}
if(game&&!game.no_areas&&areaID==''){this.showError(areaDiv,"请选择服务区");valid=false;}
if(game&&!game.no_servers&&serverID==''){this.showError(serverDiv,"请选择服务器");valid=false;}
if(game&&!game.no_races&&raceID==''){this.showError(raceDiv,"请选择种族");valid=false;}
if(game&&!game.no_professions&&professionID==''){this.showError(professionDiv,"请选择职业");valid=false;}
return valid;},validateCharactersInfo:function(){var valid=true;var inputs=$('characters_form').getInputs();var characterIDs=new Array();this.gameSelectors.keys().each(function(key){var id=parseInt(key.match(/\d+/)[0]);if(!this.delCharacterIDs.include(id))
characterIDs.push(key);}.bind(this));this.newGameSelectors.keys().each(function(key){characterIDs.push(key);}.bind(this));characterIDs.each(function(key){var id=key.match(/\d+/)[0];var newCharacter=null;if(key.match(/new/))
newCharacter=true;else
newCharacter=false;valid&=this.isCharacterNameValid(id,newCharacter);valid&=this.isCharacterLevelValid(id,newCharacter);valid&=this.isGameValid(id,newCharacter);}.bind(this));return valid;},updateCharacters:function(profileID,token,button,event){Event.stop(event);if(this.validateCharactersInfo()){var delCharacterParams='';for(var i=0;i<this.delCharacterIDs.length;i++){delCharacterParams+="profile[del_characters][]="+this.delCharacterIDs[i]+"&";}
new Ajax.Request('/profiles/'+profileID+'?type=3',{method:'put',parameters:delCharacterParams+$('characters_form').serialize(),onLoading:function(){Iyxzone.disableButton(button,'请等待..');},onSuccess:function(transport){$('character_frame').innerHTML=transport.responseText;this.editCharactersHTML=null;this.gameSelectors=new Hash();this.newGameSelectors=new Hash();this.delCharacterIDs=new Array();this.isEditingCharacters=false;}.bind(this)});}},removeCharacter:function(characterID,newCharacter,link){if(newCharacter)
prefix='new';else
prefix='existing';if(newCharacter){this.newGameSelectors.unset(prefix+'_'+characterID);}else{this.delCharacterIDs.push(characterID);}
$(prefix+'_character_'+characterID).remove();},edit:function(profileID){this.editBasicInfo(profileID);this.editContactInfo(profileID);this.editCharacters(profileID);}});Object.extend(Iyxzone.Profile.Feeder,{idx:0,moreFeeds:function(profileID){$('more_feed').innerHTML='<img src="/images/loading.gif" />';new Ajax.Request('/profiles/'+profileID+'/more_feeds?idx='+this.idx,{method:'get',onSuccess:function(transport){this.idx++;}.bind(this)});}});Object.extend(Iyxzone.Profile.Tag,{loading:function(div){div.innerHTML="<div style='textAligin: center'><img src='/images/loading.gif'/></div>";},deleteTag:function(profileID,tagID,token){new Ajax.Request('/profiles/'+profileID+'/tags/'+tagID,{method:'delete',parameters:'authenticity_token='+encodeURIComponent(token),onLoading:function(){this.loading($('tag_'+tagID));}.bind(this)});}});Iyxzone.ChineseRegion={version:'1.0',author:['高侠鸿']};Iyxzone.ChineseRegion.Selector=Class.create({initialize:function(regionSelectorID,citySelectorID,districtSelectorID,options){this.regionSelectorID=regionSelectorID;this.citySelectorID=citySelectorID;this.districtSelectorID=districtSelectorID;this.options=Object.extend({onRegionChange:Prototype.emptyFunction,onCityChange:Prototype.emptyFunction,onDistrictChange:Prototype.emptyFunction},options||{});this.setEvents();},setEvents:function(){Event.observe(this.regionSelectorID,'change',this.onRegionChange.bind(this));Event.observe(this.citySelectorID,'change',this.onCityChange.bind(this));Event.observe(this.districtSelectorID,'change',this.onDistrictChange.bind(this));},resetCityInfo:function(){$(this.citySelectorID).innerHTML='<option value="">---</option>';},setupCityInfo:function(cities){var html='<option value="">---</option>';for(var i=0;i<cities.length;i++){html+="<option value='"+cities[i].city.id+"'>"+cities[i].city.name+"</option>";}
$(this.citySelectorID).innerHTML=html;},resetDistrictInfo:function(){$(this.districtSelectorID).innerHTML='<option value="">---</option>';},setupDistrictInfo:function(districts){var html='<option value="">---</option>';for(var i=0;i<districts.length;i++){html+="<option value='"+districts[i].district.id+"'>"+districts[i].district.name+"</option>";}
$(this.districtSelectorID).innerHTML=html;},onRegionChange:function(){if(this.regionSelectorID&&$(this.regionSelectorID).value==''){this.resetCityInfo();this.resetDistrictInfo();return;}
new Ajax.Request('/cities',{method:'get',parameters:{region_id:$(this.regionSelectorID).value},onSuccess:function(transport){details=transport.responseText.evalJSON();if(this.citySelectorID)
this.resetCityInfo();if(this.districtSelectorID)
this.resetDistrictInfo();if(this.citySelectorID)
this.setupCityInfo(details);this.options.onRegionChange($(this.regionSelectorID).value);}.bind(this)});},onCityChange:function(){if(this.citySelectorID&&$(this.citySelectorID).value==''){if(this.citySelectorID)
this.resetDistrictInfo();return;}
new Ajax.Request('/districts',{method:'get',parameters:{region_id:$(this.regionSelectorID).value,city_id:$(this.citySelectorID).value},onSuccess:function(transport){details=transport.responseText.evalJSON();if(this.districtSelectorID){this.resetDistrictInfo();this.setupDistrictInfo(details);}
this.options.onCityChange($(this.citySelectorID).value);}.bind(this)});},onDistrictChange:function(){if(this.districtSelectorID&&$(this.districtSelectorID).value==''){return;}
this.options.onDistrictChange($(this.districtSelectorID).value);}});Iyxzone.Video={version:'1.0',author:['高侠鸿'],Builder:{},play:function(videoID,videoLink){$('video_'+videoID).innerHTML=videoLink;}};Object.extend(Iyxzone.Video.Builder,{tagBuilder:null,validate:function(){if($('video_title').value==''){error('标题不能为空');return false;}
if($('video_url').value==''){error('url不能为空');return false;}
if(!$('video_url').value.include('youku')){error('现在只有youku的视频才能解析。。慢慢都会有的');return false;}
if($('video_game_id').value==''){error('游戏类别不能为空');return false;}
if($('video_title').length>=100){facebox.show_error('标题太长了，最长100个字符');return false;}
return true;},prepare:function(){var newTags=this.tagBuilder.getNewTags();var delTags=this.tagBuilder.getDelTags();for(var i=0;i<newTags.length;i++){var el=new Element("input",{type:'hidden',value:newTags[i],id:'video[new_friend_tags][]',name:'video[new_friend_tags][]'});$('video_form').appendChild(el);}
for(var i=0;i<delTags.length;i++){var el=new Element("input",{type:'hidden',value:delTags[i],id:'video[del_friend_tags][]',name:'video[del_friend_tags][]'});$('video_form').appendChild(el);}},save:function(button,event){Event.stop(event);if(this.validate()){this.prepare();Iyxzone.disableButtonThree(button,'发布中..');$('video_form').submit();}},update:function(button,event){Event.stop(event);if(this.validate()){this.prepare();Iyxzone.disableButtonThree(button,'更新中..');$('video_form').submit();}}});Iyxzone.Game={version:'1.0',author:['高侠鸿'],pinyins:null,infos:null,Suggestor:{},Selector:Class.create({}),PinyinSelector:Class.create({}),Feeder:{},initPinyinSelector:function(game,area,server,race,profession,prompt,initValue,options){if(Iyxzone.Game.infos==null||Iyxzone.Game.pinyins==null){alert('错误');return;}
$(game).innerHTML='';if(prompt)
$(game).innerHTML='<option value="">---</option>';Iyxzone.Game.infos.each(function(info){Element.insert(game,{bottom:'<option value='+info.game.id+'>'+info.game.name+'</option>'});}.bind(this));$(game).value='';return new Iyxzone.Game.PinyinSelector(game,area,server,race,profession,initValue,options);}};Iyxzone.Game.Selector=Class.create({details:new Hash(),initialize:function(gameSelectorID,areaSelectorID,serverSelectID,raceSelectorID,professionSelectorID,gameDetails,options){this.gameSelectorID=gameSelectorID;this.areaSelectorID=areaSelectorID;this.serverSelectID=serverSelectID;this.raceSelectorID=raceSelectorID;this.professionSelectorID=professionSelectorID;this.details=gameDetails;this.options=Object.extend({onGameChange:Prototype.emptyFunction,onAreaChange:Prototype.emptyFunction,onServerChange:Prototype.emptyFunction,onRaceChange:Prototype.emptyFunction,onProfessionChange:Prototype.emptyFunction},options||{});this.setEvents();},setEvents:function(){if(this.gameSelectorID)
Event.observe(this.gameSelectorID,'change',this.gameChange.bind(this));if(this.areaSelectorID)
Event.observe(this.areaSelectorID,'change',this.areaChange.bind(this));if(this.serverSelectID)
Event.observe(this.serverSelectID,'change',this.serverChange.bind(this));if(this.raceSelectorID)
Event.observe(this.raceSelectorID,'change',this.raceChange.bind(this));if(this.professionSelectorID)
Event.observe(this.professionSelectorID,'change',this.professionChange.bind(this));},resetGameInfo:function(){$(this.gameSelectorID).value='';},resetAreaInfo:function(){if($(this.areaSelectorID))
$(this.areaSelectorID).innerHTML='<option value="">---</option>';},setupAreaInfo:function(areas){var html='<option value="">---</option>';for(var i=0;i<areas.length;i++){html+="<option value='"+areas[i].id+"'>"+areas[i].name+"</option>";}
$(this.areaSelectorID).innerHTML=html;},resetServerInfo:function(){$(this.serverSelectID).innerHTML='<option value="">---</option>';},setupServerInfo:function(servers){var html='<option value="">---</option>';for(var i=0;i<servers.length;i++){html+="<option value='"+servers[i].id+"'>"+servers[i].name+"</option>";}
$(this.serverSelectID).innerHTML=html;},resetProfessionInfo:function(){$(this.professionSelectorID).innerHTML='<option value="">---</option>';},setupProfessionInfo:function(professions){var html='<option value="">---</option>';for(var i=0;i<professions.length;i++){html+="<option value='"+professions[i].id+"'>"+professions[i].name+"</option>";}
$(this.professionSelectorID).innerHTML=html;},resetRaceInfo:function(){$(this.raceSelectorID).innerHTML='<option value="">---</option>';},setupRaceInfo:function(races){var html='<option value="">---</option>';for(var i=0;i<races.length;i++){html+="<option value='"+races[i].id+"'>"+races[i].name+"</option>";}
$(this.raceSelectorID).innerHTML=html;},gameChange:function(){if(this.gameSelectorID&&$(this.gameSelectorID).value==''){this.reset();return;}
new Ajax.Request('/game_details/'+$(this.gameSelectorID).value+'.json',{method:'get',onSuccess:function(transport){this.details=transport.responseText.evalJSON().game;if(this.areaSelectorID)
this.resetAreaInfo();if(this.serverSelectID)
this.resetServerInfo();if(this.raceSelectorID)
this.resetRaceInfo();if(this.professionSelectorID)
this.resetProfessionInfo();if(!this.details.no_areas){this.setupAreaInfo(this.details.areas);}else{this.setupServerInfo(this.details.servers);}
if(!this.details.no_professions&&this.professionSelectorID)
this.setupProfessionInfo(this.details.professions);if(!this.details.no_races&&this.raceSelectorID)
this.setupRaceInfo(this.details.races);this.options.onGameChange($(this.gameSelectorID).value);}.bind(this)});},areaChange:function(){if(this.areaSelectorID&&$(this.areaSelectorID).value==''){if(this.serverSelectID)
this.resetServerInfo();return;}
new Ajax.Request('/area_details/'+$(this.areaSelectorID).value+'.json',{method:'get',onSuccess:function(transport){var areaInfo=transport.responseText.evalJSON().game_area;if(this.serverSelectID)
this.setupServerInfo(areaInfo.servers);this.options.onAreaChange($(this.areaSelectorID).value);}.bind(this)});},serverChange:function(){if(this.serverSelectID&&$(this.serverSelectID).value==''){return;}
this.options.onServerChange($(this.serverSelectID).value);},raceChange:function(){if(this.raceSelectorID&&$(this.raceSelectorID).value==''){return;}
this.options.onRaceChange($(this.raceSelectorID).value);},professionChange:function(){if(this.professionSelectorID&&$(this.professionSelectorID).value==''){return;}
this.options.onProfessionChange($(this.professionSelectorID).value);},reset:function(){this.resetGameInfo();if(this.areaSelectorID)
this.resetAreaInfo();if(this.serverSelectID)
this.resetServerInfo();if(this.professionSelectorID)
this.resetProfessionInfo();if(this.raceSelectorID)
this.resetRaceInfo();this.details=null;},getDetails:function(){return this.details;}});Iyxzone.Game.PinyinSelector=Class.create(Iyxzone.Game.Selector,{initialize:function($super,gameSelectorID,areaSelectorID,serverSelectID,raceSelectorID,professionSelectorID,gameDetails,options){if(Iyxzone.Game.pinyins==null){alert("shit");return;}
this.mappings=new Hash();this.keyPressed='';this.lastPressedAt=null;this.currentGameID=null;var i=0;for(var i=0;i<26;i++){var code=97+i;var j=this.binarySearch(code);if(j!=-1){this.mappings.set(code,j);this.mappings.set(code-32,j);}}
$super(gameSelectorID,areaSelectorID,serverSelectID,raceSelectorID,professionSelectorID,gameDetails,options);},setEvents:function($super){$super();Event.observe($(this.gameSelectorID),'keyup',function(e){Event.stop(e);this.onKeyUp(e);}.bind(this));Event.observe($(this.gameSelectorID),'blur',function(e){this.lastPressedAt=null;this.keyPressed='';}.bind(this));},binarySearch:function(keyCode){var pinyins=Iyxzone.Game.pinyins;var size=pinyins.length;var i=0;var j=size-1;var c1=pinyins[i].toLowerCase().charCodeAt(0);var c2=pinyins[j].toLowerCase().charCodeAt(0);if(c1>keyCode)return-1;if(c2<keyCode)return-1;while(i!=j-1){var m=Math.ceil((i+j)/2);var c=pinyins[m].toLowerCase().charCodeAt(0);if(c<keyCode){i=m;}else{j=m;}}
c1=pinyins[i].toLowerCase().charCodeAt(0);c2=pinyins[j].toLowerCase().charCodeAt(0);if(c1!=keyCode&&c2!=keyCode)return-1;if(c1==keyCode)return i;if(c2==keyCode)return j;},onKeyUp:function(e){var pinyins=Iyxzone.Game.pinyins;var code=e.keyCode;var now=new Date().getTime();if(this.lastPressedAt==null||(now-this.lastPressedAt)<1000){this.lastPressedAt=now;this.keyPressed+=String.fromCharCode(e.keyCode);}else{this.lastPressedAt=now;this.keyPressed=String.fromCharCode(e.keyCode);}
var len=this.keyPressed.length;var startPos=this.mappings.get(this.keyPressed.charCodeAt(0));if(startPos==null)return;for(var i=startPos;i<pinyins.length;i++){if(pinyins[i].substr(0,len)==this.keyPressed.toLowerCase()){if($(this.gameSelectorID).selectedIndex!=i){$(this.gameSelectorID).value=$(this.gameSelectorID).options[i].value;this.currentGameID=$(this.gameSelectorID).value;setTimeout(this.fireGameChangeEvent.bind(this),500);}
return;}}},fireGameChangeEvent:function(){if(this.currentGameID==null)return;$(this.gameSelectorID).simulate('change');this.currentGameID=null;}});Iyxzone.Game.Autocompleter=Class.create(Autocompleter.Base,{initialize:function(element,update,url,options){this.baseInitialize(element,update,options);this.options.asynchronous=true;this.options.onComplete=this.onComplete.bind(this);this.options.defaultParams=this.options.parameters||null;this.url=url;this.comp=this.options.comp;this.emptyText=this.options.emptyText||"没有匹配的..."
Event.observe(element,'focus',this.onInputFocus.bindAsEventListener(this));},onInputFocus:function(e){this.options.onInputFocus(this.element);},getUpdatedChoices:function(){this.startIndicator();var entry=encodeURIComponent(this.options.paramName)+'='+encodeURIComponent(this.getToken());this.options.parameters=this.options.callback?this.options.callback(this.element,entry):entry;if(this.options.defaultParams)
this.options.parameters+='&'+this.options.defaultParams;this.options.parameters+='&tag[name]='+this.element.value;new Ajax.Request(this.url,this.options);},onComplete:function(request){if(request.responseText.indexOf('li')<0){this.update.innerHTML=this.options.emptyText;}else{this.updateChoices(request.responseText);}
if(this.comp){this.update.setStyle({position:'absolute',left:this.comp.positionedOffset().left+'px',top:(this.comp.positionedOffset().top+this.comp.getHeight())+'px',width:(this.comp.getWidth()-10)+'px',maxHeight:'200px',overflow:'auto',padding:'5px',background:'white',border:'1px solid #E7F0E0'});}}});Object.extend(Iyxzone.Game.Suggestor,{tagNames:new Array(),tagList:null,prepare:function(){this.tagList=new TextBoxList($('game_tags'),{onBoxDispose:this.removeTag.bind(this),holderClassName:'friend-select-list s_clear',bitClassName:''});new Iyxzone.Game.Autocompleter(this.tagList.getMainInput(),$('game_tag_list'),'/auto_complete_for_game_tags',{method:'get',emptyText:'没有匹配的关键字...',afterUpdateElement:this.afterSelectTag.bind(this),onInputFocus:this.showTips.bind(this),comp:this.tagList.holder});},showTips:function(){$('game_tag_list').innerHTML='输入游戏特点, 拼音或者汉字';$('game_tag_list').setStyle({position:'absolute',left:this.tagList.holder.positionedOffset().left+'px',top:(this.tagList.holder.positionedOffset().top+this.tagList.holder.getHeight())+'px',width:(this.tagList.holder.getWidth()-10)+'px',maxHeight:'200px',overflow:'auto',padding:'5px',background:'white',border:'1px solid #E7F0E0'});$('game_tag_list').show();},afterSelectTag:function(input,selectedLI){var text=selectedLI.childElements()[0].innerHTML;this.addTag(text);input.clear();},hasTag:function(tagName){for(var i=0;i<this.tagNames.length;i++){if(tagName==this.tagNames[i])
return true;}
return false;},addTag:function(tagName){if(this.hasTag(tagName)){tip('你已经选择了该标签');return;}
this.tagList.add(tagName,tagName);this.tagNames.push(tagName);},removeTag:function(box,input){var tagNames=Iyxzone.Game.Suggestor.tagNames;var text=input.value;for(var i=0;i<tagNames.length;i++){if(text==tagNames[i])
tagNames.splice(i,1);}},suggest:function(button){if(this.tagNames.length==0){notice('请您点击游戏相关类型，以便我们向您推荐');}else{var newGame=$('new_game');new Ajax.Request('/game_suggestions/game_tags',{method:'get',parameters:{selected_tags:this.tagNames.join(','),new_game:newGame.checked},onLoading:function(){Iyxzone.disableButton(button,'请等待..');},onComplete:function(){Iyxzone.enableButton(button,'推荐');},onSuccess:function(transport){$('game_suggestion_area').innerHTML=transport.responseText;}.bind(this)});}},toggleAdvancedOptions:function(){if($('advanced_options').visible()){Effect.BlindUp($('advanced_options'));}else{Effect.BlindDown($('advanced_options'));}}});Object.extend(Iyxzone.Game.Feeder,{idx:0,moreFeeds:function(gameID){$('more_feed').innerHTML='<img src="/images/loading.gif" />';new Ajax.Request('/games/'+gameID+'/more_feeds?idx='+this.idx,{method:'get',onSuccess:function(transport){this.idx++;}.bind(this)});}});(function(){var eventMatchers={'HTMLEvents':/^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,'MouseEvents':/^(?:click|mouse(?:down|up|over|move|out))$/}
var defaultOptions={pointerX:0,pointerY:0,button:0,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false,bubbles:true,cancelable:true}
Event.simulate=function(element,eventName){var options=Object.extend(defaultOptions,arguments[2]||{});var oEvent,eventType=null;element=$(element);for(var name in eventMatchers){if(eventMatchers[name].test(eventName)){eventType=name;break;}}
if(!eventType)
throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');if(document.createEvent){oEvent=document.createEvent(eventType);if(eventType=='HTMLEvents'){oEvent.initEvent(eventName,options.bubbles,options.cancelable);}
else{oEvent.initMouseEvent(eventName,options.bubbles,options.cancelable,document.defaultView,options.button,options.pointerX,options.pointerY,options.pointerX,options.pointerY,options.ctrlKey,options.altKey,options.shiftKey,options.metaKey,options.button,element);}
element.dispatchEvent(oEvent);}
else{options.clientX=options.pointerX;options.clientY=options.pointerY;oEvent=Object.extend(document.createEventObject(),options);element.fireEvent('on'+eventName,oEvent);}
return element;}
Element.addMethods({simulate:Event.simulate});})()