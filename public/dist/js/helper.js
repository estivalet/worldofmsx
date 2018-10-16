

function changePage(target, page) {
    $.ajax({
      url : "/" + target + "?page=" + page,
      type : "get",
      success : function(data) {
          console.log(data);

          $("#id").val("");

          var tableBody = document.getElementById(target + "s");
          tableBody.innerHTML = "";

          $.each(data.genres, function(index, element) {
            
            // Create a row.
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            // Name column.
            var td = document.createElement('TD');
            var span = document.createElement('SPAN');
            span.innerHTML = element.name;
            td.appendChild(span);
            tr.appendChild(td);

            // Actions column.
            var td = document.createElement('TD');
            var span = document.createElement('SPAN');
            span.innerHTML = '<a href="#" onclick=edit_'+ target + '("'+ element.id + '")>edit</a>&nbsp;<a href="#" onclick=delete_' + target + '("'+ element.id + '")>delete</a>';
            td.appendChild(span);
            tr.appendChild(td);

          });

          var pagination = document.getElementById("pagination");
          pagination.innerHTML = "";

          var li = document.createElement('LI');
          var a = document.createElement('A');
          a.innerText = "First";
          li.appendChild(a);
          if (data.current == 1) {
            li.className = "disabled";
          } else {
            a.onclick = function() {
                changePage(1);
            }
          }
          pagination.appendChild(li);
        
          var i = (Number(data.current) > 5 ? Number(data.current) - 4 : 1);
          if (i !== 1) {
            var li = document.createElement('LI');
            li.className = "disabled";
            var a = document.createElement('A');
            a.innerText = "...";
            li.appendChild(a);
            pagination.appendChild(li);
          }

          for (; i <= (Number(data.current) + 4) && i <= data.pages; i++) {
              var li = document.createElement('LI');
              var a = document.createElement('A');
              a.innerHTML = i;
              if (i == data.current) {
                li.className = "active";
              } else {
                a.onclick = function() {
                    changePage(this.innerText);
                }
              }
              if (i == Number(data.current) + 4 && i < data.pages) {
                li.className = "disabled";
                a.innerHTML = "...";
              } 
              li.appendChild(a);
              pagination.appendChild(li);
          }

          var li = document.createElement('LI');
          var a = document.createElement('A');
          a.innerHTML = "Last";
          if (data.current == data.pages) {
            li.className = "disabled";
          } else {
            a.onclick = function() {
                changePage(data.pages);
            }
          }
          li.appendChild(a);
          pagination.appendChild(li);
      }
    });
}