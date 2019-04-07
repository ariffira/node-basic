// doc ready
$(()=> {
    
})

$('#searchWeb').click((e)=> {
  e.preventDefault();
  let website = $('#website').val();
  //alert(website);
  $.ajax({
     url: '/search',
     type: 'post',
     data: JSON.stringify({ website: website }),
     dataType: 'json',
     contentType: "application/json; charset=utf-8",
     success: function(users) {
         console.log(users)
         if(users=== []) {
            $('#result').html('No result found! Please try another data');
         }
         else {
            $('#result').html(JSON.stringify(users));
         }
         
     },
     error: function(error) {
         console.log(error);
     }
  });
});