/**
 * TODO:
 * 点击document.body，隐藏表情 
 * Change Log
 * 1.1 add to 50 emotions, Mar.16,2010
 */

Iyxzone.Emotion = {
  version: '1.1',

  author: ['高侠鸿','戴雨宸'],

  //faces: ['[-_-]', '[@o@]', '[-|-]', '[o_o]', '[ToT]', '[*_*]'],
	faces: [ '[惊吓]', '[晕]', '[流鼻涕]', '[挖鼻子]', '[鼓掌]', '[骷髅]', '[坏笑]', '[傲慢]', '[大哭]', '[砸头]', '[衰]', '[哭]', '[可爱]', '[冷汗]', '[抽烟]', '[擦汗]', '[亲亲]', '[糗]', '[吃惊]', '[左哼哼]', '[疑问]', '[惊恐]', '[睡觉]', '[皱眉头]', '[可怜]', '[打呵欠]', '[害羞]', '[花痴]', '[右哼哼]', '[囧]', '[大便]', '[咒骂]', '[贼笑]', '[嘘]', '[吐]', '[苦恼]', '[白眼]', '[流汗]', '[大笑]', '[羞]', '[撇嘴]', '[偷笑]', '[BS]', '[困]', '[火]', '[闭嘴]', '[抓狂]', '[强]', '[不行]', '[装酷]' ],

  facesCount: 50,

	facesPerPage: 30 ,

  facesPerRow: 10 ,

  rows: 4,

  specials: ['/', '.', '*', '+', '?', '|','(', ')', '[', ']', '{', '}', '\\'],

  escape: function(text){},

  Manager: {}

};


Object.extend(Iyxzone.Emotion.Manager, {

  linkToFieldsMappings: new Hash(),

  linkToFacesMappings: new Hash(),

  constructFacesTable: function(link, textField){
    if(textField == null) return;

    // I am a lazy boy... save constants to local variant
    var rows = Iyxzone.Emotion.rows;
    var facesPerRow = Iyxzone.Emotion.facesPerRow;
    var facesCount = Iyxzone.Emotion.facesCount;
    var faces = new Element('div', {class:'con'});
		//TODO

    document.body.appendChild(faces);

				var a = new Element('a', {title:'傲慢', href:'#'})
        var img = new Element('img', {src: "/faces/"+ i +".gif",  index:i});
				a.appendChild(img)
        row.appendChild(column);
      
      faces.appendChild(row);
    

    // locate faces
    faces.setStyle({
      position: 'absolute',
      zIndex: '20000',
      left: (link.cumulativeOffset().left - 200) + 'px',
      top: (link.cumulativeOffset().top) + 'px',
      width: '200px',
      height: '40px'
    });

    // set click events
    // this must be done after faces are appended in document.body
    var icons = faces.getElementsByClassName('emotion-icon');
    for(var i=0;i<icons.length;i++){
      icons[i].observe('click', function(e){
        var idx = parseInt(e.element().readAttribute('index'));
        textField.value += Iyxzone.Emotion.faces[idx];
        this.toggleFaces(link, textField);
      }.bind(this));
    }

    return faces;
  },

  toggleFaces: function(link, textField){
    // get corresponding faces
    var faces = this.linkToFacesMappings.get(link);

    // if faces table exists, show/hide it
    // otherwise create a new table and bind it to textField
    if(faces && faces.visible()){
      faces.hide();
    }else if(faces && !faces.visible()){
      faces.show();
      // locate faces
      faces.setStyle({
        position: 'absolute',
        zIndex: '20000',
        left: (link.cumulativeOffset().left - 200) + 'px',
        top: (link.cumulativeOffset().top) + 'px',
        width: '200px',
        height: '40px'
      });
    }else{
      var faces = this.constructFacesTable(link, textField);
      this.linkToFieldsMappings.set(link, textField);
      this.linkToFacesMappings.set(link, faces);
      faces.show();
    }
  }

});
