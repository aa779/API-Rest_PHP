$(document).ready(function() {
  $(document).on('click', '.delete-product-button', function(){
    var product_id = $(this).attr('data-id');
    bootbox.confirm({
      message: "<h4>Tem certeza?</h4>",
      buttons: {
        confirm: {
          label: '<!--span class="glyphicon glyphicon-ok"></span--> Sim',
          className: 'btn-danger'
        },
        cancel: {
          label: '<!--span class="glyphicon glyphicon-remove"></span--> Não',
          className: 'btn-primary'
        }
      },
      callback: function (result) {
        if (result == true) {
          $.ajax({
            url : "http://localhost:8080/api-rest/api/product/delete.php",
            type : "POST",
            dataType : 'json',
            data : JSON.stringify({ id: product_id }),
          });
        }
        var read_products_to_html = pegaJSON();
        
        read_products_to_html.then((read_products_to_html) => {
          showProducts(read_products_to_html);
        });
      }
    });
  });
});
