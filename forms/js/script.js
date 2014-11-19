
window.onload=function() {
IE1=false;
if(document.all && !window.atob) //проверка на IE
IE();
if(IE1==true) //мы в IE
{
      $('#form').keyup(function () //проверка заполненности формы 
      {
        if($('#pas').val()&& $('#email').val()&& $('#pas').val()!="Password" && $('#email').val()!="E-mail")
        $('#go').prop('disabled', false);       
        else
          $('#go').prop('disabled', true);
      
        
      });
  }
  else//если мы не в IE 8-9
  {
      $('#form').keyup(function () 
      {
       if($('#pas').val()&& $('#email').val())
        $('#go').prop('disabled', false);
        else
          $('#go').prop('disabled', true);
         });
  }



  $('#go').click(function () //нажатие на кнопку отправки данных
  {

    var doc=document;
    var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;  

    if($('#pas').val().length>=6&&$("#email").val().search(pattern) == 0)//если валидны данные
    {
  
          var email=doc.getElementById("email").value;
          var pas=doc.getElementById("pas").value;//запоминаем данные формы
          $('#preloader').fadeIn();  
          $('#error').css('display','none');//закрываем поле с ошибками
          $("#all").animate({
                  marginLeft: "-100%",
           }, 400, function() {
              
                    $("body").toggleClass("bg pg");//меняем фон

                    
                    $.ajax({//отправляем данные на сервер (пусть здесь его и нет)
                      dataType:"html",
                      type:"POST",
                      async:true,
                      data:({
                      'email':email,
                      'pas':pas
                      }),
                      success:function()
                        {
                      
                         $("#all").css('marginLeft','100%');//форма появляется справа за пределами экрана
                         $('#pas').val('');//Обнуляем поля
                         $('#email').val('');
                         $("#click").toggleClass("click1 click2");//меняем все классы на классы другой формы
                         $('#pas').toggleClass("v1 v2");
                         $('#email').toggleClass("v1 v2");
                         $('#wrapper').toggleClass("bord1 bord2");
                         $('#go').toggleClass("blue pink");
                         $('#go').prop('disabled', true);
                         if(document.all && !window.atob)//снова проверяем, не в IE ли мы
                         {   
                          IE();
                          $('#main-form').toggleClass("bie pie"); //если в IE, то нужно сменить еще пару классов
                         }
                         $('#preloader').css('display','none');
                         $("#all").animate({ //на середину экрана выезжает новая форма
                            marginLeft: $(window).width()/2-$("#all").width()/2,

                            }, 400);

                          }
                    });


              });
           

  }
  else //если невалидны поля
  {
 $("#error").fadeIn(); 
    if($('#pas').val().length<6)
    {
      $('#txt').html("Password is too short!!!");
    }
    if($("#email").val().search(pattern) != 0)
    {

      $('#txt').html( "E-mail has invalid value!!! ");
    }
        if($('#pas').val().length<6 && $("#email").val().search(pattern) != 0)
    {

      $('#txt').html("Password is too short!!!E-mail has invalid value!!!");
    }
  }

});

$('#exit').click(function () {
 $("#error").fadeOut();
});


  function IE()//placeholderы для IE8-9
      {IE1=true;//мы в IE, созданные placeholderы воспринимаются как введенный текст, 
        //поэтому нужно добавить проверку того, введены ли символы или же это placeholderы

        var doc=document;
        var email=doc.getElementById('email');
        var pas=doc.getElementById('pas');
        var clas="placeIE"; 
        pas.className+=" "+clas;
        email.className+=" "+clas;
        pas.value=pas.getAttribute("placeholder");
        pas.onfocus = function() 
        { // сфокусировались
          if( pas.value==pas.getAttribute("placeholder"))
          pas.value='';
        }
        pas.onblur = function() 
        { // убрали мышь
          if(!pas.value)//если значения нет
          pas.value=pas.getAttribute("placeholder");
          }

        email.value=email.getAttribute("placeholder");
        email.onfocus = function() 
        { // сфокусировались
          if( email.value==email.getAttribute("placeholder"))
          email.value='';
        }
        email.onblur = function() 
        { // убрали мышь
          if(!email.value)//если значения нет
          email.value=email.getAttribute("placeholder");
        }

      }

};
    
  		
  
  
	
	
