$(document).ready(function() {
  $(document).on('click', '.read-one-product-button', async function() {
    var id = $(this).attr('data-id');
    await $.ajax({
      url: "http://localhost:8080/api-rest/api/product/read_one.php?id=" + id,
      type: "GET",
      dataType: "text",
      contentType : "text/plain",
      success: function(result) {
        data = JSON.parse(result.substring(2));
        var read_one_product_html=`
          <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
            <!--span class='glyphicon glyphicon-list'></span-->Listar Produtos
          </div>
          <table class='table table-bordered table-hover'>
            <tr>
              <td class='w-30-pct'>Nome</td>
              <td class='w-70-pct'>` + data.nome + `</td>
            </tr>
         
            <tr>
              <td>Price</td>
              <td>` + data.preco + `</td>
            </tr>
         
            <tr>
              <td>Description</td>
              <td>` + data.descricao + `</td>
            </tr>
         
            <tr>
              <td>Category</td>
              <td>` + data.categoria_nome + `</td>
            </tr>
          </table>`;
        $("#page-content").html(read_one_product_html);
        changePageTitle("Visualizar Produto");
      }
    })
    .fail(function(textStatus, errorThrown) {
      console.log("erro: ", textStatus, errorThrown);
    });
  });
});