$(document).ready(function() {
  var id = 0;
  var nome           = "";
  var preco          = "";
  var descricao      = "";
  var categoria_id   = "";
  var categoria_nome = "";
  var categories_options_html = "";
  $(document).on('click', '.update-product-button', async function() {
    id = $(this).attr('data-id');
    if (id > 0) {
      await $.ajax({
        url: "http://localhost:8080/api-rest/api/product/read_one.php?id=" + id,
        type: "GET",
        dataType: "text",
        contentType : "text/plain",
        success: function(result){
          data = JSON.parse(result.substring(2));
          nome           = data.nome;
          preco          = data.preco;
          descricao      = data.descricao;
          categoria_id   = data.categoria_id;
          categoria_nome = data.categoria_nome;
        }
      })
      .fail(function(textStatus, errorThrown) {
        console.log("erro: ", textStatus, errorThrown);
      });
      await $.ajax({
        url: "http://localhost:8080/api-rest/api/category/read.php",
        type: "GET",
        dataType: "text",
        contentType : "text/plain",
        success: function(result) {
          data = JSON.parse(result.substring(2));
          categories_options_html = `<select name='categoria_id' class='form-control'>`;

          $.each(data.records, function(key, val){
            if (val.id == categoria_id)
              categories_options_html += `<option value='` + val.id + `' selected>` + val.nome + `</option>`;
            else
              categories_options_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
          });
          categories_options_html += `</select>`;
        }
      })
      .fail(function(textStatus, errorThrown) {
        console.log("erro: ", textStatus, errorThrown);
      });
    
      var update_product_html = `
        <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
          <!--span class='glyphicon glyphicon-list'></span--> Listar Produtos
        </div>
        <form id='update-product-form' action='#' method='post' border='0'>
          <table class='table table-hover table-responsive table-bordered'>
            <tr>
              <td>Nome</td>
              <td><input value=\"` + nome + `\" type='text' name='nome' class='form-control' required /></td>
            </tr>
            <tr>
              <td>Preço</td>
              <td><input value=\"` + preco + `\" type='number' min='1' name='preco' class='form-control' required /></td>
            </tr>
            <tr>
              <td>Descrição</td>
              <td><textarea name='descricao' class='form-control' required>` + descricao + `</textarea></td>
            </tr>
            <tr>
              <td>Categoria</td>
              <td>` + categories_options_html + `</td>
            </tr>
            <tr>
              <td><input value=\"` + id + `\" name='id' type='hidden' /></td>
              <td>
                <button type='submit' class='btn btn-info'>
                  <!--span class='glyphicon glyphicon-edit'></span--> Alterar Produto
                </button>
              </td>
            </tr>
          </table>
        </form>`;
      $("#page-content").html(update_product_html);
       
      changePageTitle("Alterar Produto");
      
      $(document).on('submit', '#update-product-form', function() {
        var form_data = JSON.stringify($(this).serializeObject());
        $.ajax({
          url : "http://localhost:8080/api-rest/api/product/update.php",
          type : "POST",
          contentType : "text/plain",
          data : form_data
        });
        var read_products_to_html = pegaJSON();
        
        read_products_to_html.then((read_products_to_html) => {
          showProducts(read_products_to_html);
        });
        return false;
      });
    }
  });
});