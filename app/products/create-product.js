$(document).on('click', '#create-product', async function(){
  var categories_options_html = `<select name='categoria_id' class='form-control'>`;
  await $.ajax({
    url: "http://localhost:8080/api-rest/api/category/read.php",
    type: "GET",
    dataType: "text",
    contentType : "text/plain",
    success: function(result){
      data = JSON.parse(result.substring(2));
      $.each(data.records, function(key, val){
        categories_options_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
      });
    }
  })
  .fail(function(textStatus, errorThrown) {
    console.log("erro: ", textStatus, errorThrown);
  });
  categories_options_html += `</select>`;
  
  var create_product_html = `
    <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
      <!--span class='glyphicon glyphicon-list'></span--> Listar Produtos
    </div>
    
    <form id='create-product-form' action='#' method='post' border='0'>
      <table class='table table-hover table-responsive table-bordered'>
        <tr>
          <td>Nome</td>
          <td><input type='text' name='nome' class='form-control' required /></td>
        </tr>
        <tr>
          <td>Preço</td>
          <td><input type='number' min='1' name='preco' class='form-control' required /></td>
        </tr>
        <tr>
          <td>Descrição</td>
          <td><textarea name='descricao' class='form-control' required></textarea></td>
        </tr>
        <tr>
          <td>Categoria</td>
          <td>` + categories_options_html + `</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button type='submit' class='btn btn-primary'>
              <!--span class='glyphicon glyphicon-plus'></span--> Criar Produto
            </button>
          </td>
        </tr>
   
      </table>
    </form>`;

    $("#page-content").html(create_product_html);

    changePageTitle("Criar Produto");
  });

  $(document).on('submit', '#create-product-form', function() {
    var form_data = JSON.stringify($(this).serializeObject());
    $.ajax({
      url : "http://localhost:8080/api-rest/api/product/create.php",
      type : "POST",
      contentType : "text/plain",
      data : form_data
      // success : function(result) {
      // },
      // error : function(xhr, resp, txt) {
        // console.log(xhr, resp, txt);
      // }
    });
    var read_products_to_html = pegaJSON();
    
    read_products_to_html.then((read_products_to_html) => {
      showProducts(read_products_to_html);
    });
    return false;
  });
