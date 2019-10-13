$(() => {
    /* signing up a user */

    $("#sign-up").on('click', (e) => {
        e.preventDefault();
        const name = $("#name").val();
        const email = $("#email").val();
        const password = $("#pwd").val();
        const data = { name: name, email: email, password: password }
        if (name.length < 1 || email.length < 1 || password.length < 1) {
            $('.empty-data').show();
            return;
        }
    });
            /* Query database to check existing email */
            $.ajax({
                url: "http://localhost:3000/users?email=" + email,
                type: "GET",
                contentType: "application/json",
                success: (result, status, xhr) => {
                    console.log(result);
    
                    if (result.length > 0) {
                        $('.already-data').show();
                    } else {
                        $.ajax({
                            url: "http://localhost:3000/users",
                            data: JSON.stringify(data),
                            type: "POST",
                            contentType: "application/json",
                            error: (xhr, status, error) => {
                                alert(error)
                            },
                            success: (result, status, xhr) => {
                                window.location.href = "login.html";
    
                            }
    
                        });
                    }
    
                }
    
            });

            /* Log in check */
            $("#log-in").on('click', (e) => {
                e.preventDefault();
                const email = $("#email").val();
                const password = $("#pwd").val();
                const data = { name: name, email: email, password: password }
        
                if (email.length < 1 || password.length < 1) {
                    $('.empty-data').show();
                    return;
                }
        
                $.ajax({
                    url: "http://localhost:3000/users?email=" + email,
                    type: "GET",
                    contentType: "application/json",
                    success: (result, status, xhr) => {
                        if (result.length > 0) {
                            if (password == result[0].password) {
                                window.location.href = "home.html";
                                localStorage.setItem("username", result[0].name);
                            } else {
                                $('.wrong-password').show();
        
                            }
                        } else {
                            $('.not-exist').show();
                        }
        
                    }
        
        
        
        
                })
            })
            /* Load design image on selection */
$('#picture-picker').on('change', (e)=> {
    // $("#load-image").attr('alt', this.value);
    alert(e.target.value)
 })
 
 /* Submitting a new design segment */
 $(".submit-design").on('click', (e) => {
     e.preventDefault();
     const designName = $("#designName").val();
     const image = $("#imgUrl").val();
     const model = $("#model").val();
     const gender = $("#gender").val();
     const designType = $("#designType").val();
     const size = $("#size").val();
     const color = $("#color").val();
     const description = $("#description").val();
     const data = {
         designName : designName, image : image, model: model, gender:gender,
          designType:designType, size:size, color:color, description:description,
          date : new Date(), poster: localStorage.getItem("username"), isBooked: false,
         bookedBy: "None"
     }
     if(designName.length < 1 || image.length < 1 || model.length < 1 || gender.length < 1 || designType.length < 1 || size.length < 1 || color.length < 1 || description.length < 1){
             $('.empty-data').show();
             return ;
     }
     $.ajax({
         url: "http://localhost:3000/designs",
         data: JSON.stringify(data),
         type: "POST",
         contentType: "application/json",
         error: (xhr, status, error) => {
             alert(error)
         },
         success: (result, status, xhr) => {
          
            $('.add-design').show();
            $('#new-form').hide();
 
         }
 
     });
     
     
 
 
 });
 /* Getting all designs */
 $.ajax({
         url: "http://localhost:3000/designs",
         type: "GET",
         contentType: "application/json",
         success: (result, status, xhr) => {
             // console.log(result);
             let output = "";
             var div = $(".designs");
             for(i in result) {
                 output += ` <div class="col-md-4 card-press" id="` + result[i].id + `">
                 <div class="card" style="width:350px; border-radius: 20px; margin-bottom: 20px">
                 <img class="card-img-top" style="border-radius:20px 20px 0px 0px" src="` + result[i].image + `"alt="Card image">
                 <div class="card-body" style="padding-bottom: 0">
                 <div class="row">
                 <div class="col-md-8">
                 <h4>` + result[i].designName+ `</h4>
                 </div>
                 <div class="col-md-4">
                 <p class="card-text pull-right">` +result[i].model+`</p>
                 </div>
                 </div>
                 <hr style="margin: 5 0 5 0  !important ">
                 <p class="card-text">`+result[i].description+`</p>
                 <a href="#" class=" fa fa-heart-o" style="color: green"></a>
                 <p style="font-size: 12px; color: green;">Posted by `+result[i].poster+`</p>
                 </div>
                 </div>
             </div> `;
           
         }
         div.append(output);
       
         }
        
 });
 /* Get designs posted ny user */
 let poster = localStorage.getItem("username")
 $.ajax({
     url: "http://localhost:3000/designs?poster=" + poster,
     type: "GET",
     contentType: "application/json",
     success: (result, status, xhr) => {
         // console.log(result);
         let output = "";
         var div = $(".myDesigns");
         for(i in result) {
             output += ` <div class="col-md-4 card-press" id="` + result[i].id + `">
             <div class="card" style="width:350px; border-radius: 20px; margin-bottom: 20px">
             <img class="card-img-top" style="border-radius:20px 20px 0px 0px" src="` + result[i].image + `"alt="Card image">
             <div class="card-body" style="padding-bottom: 0">
             <div class="row">
             <div class="col-md-8">
             <h4>` + result[i].designName+ `</h4>
             </div>
             <div class="col-md-4">
             <p class="card-text pull-right">` +result[i].model+`</p>
             </div>
             </div>
             <hr style="margin: 5 0 5 0  !important ">
             <p class="card-text">`+result[i].description+`</p>
             <a href="#" class=" fa fa-heart-o" style="color: green"></a>
             <p style="font-size: 12px; color: green;">Posted by `+result[i].poster+`</p>
             </div>
             </div>
         </div> `;
       
     }
     div.append(output);
   
     }
    
});
    
});