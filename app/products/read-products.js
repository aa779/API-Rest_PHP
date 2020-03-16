$(document).ready(function() {
  var read_products_to_html = pegaJSON();
  
  read_products_to_html.then((read_products_to_html) => {
    showProducts(read_products_to_html);
  });
  
  $(document).on('click', '.read-products-button', function(){
    read_products_to_html.then((read_products_to_html) => {
      showProducts(read_products_to_html);
    });
  });
});
 
async function pegaJSON() {
  var read_products = "";
  await $.ajax({
    url: "http://localhost:8080/api-rest/api/product/read.php",
    type: "GET",
    dataType: "text",
    contentType : "text/plain",
    success: function(result){
      data = JSON.parse(result.substring(2));
      $.each(data.records, function(key, val) {
        read_products += `
          <tr>
            <td>` + val.nome + `</td>
            <td>$` + val.preco + `</td>
            <td>` + val.categoria_nome + `</td>
            <td>
              <button class='btn btn-primary m-r-10px read-one-product-button' data-id='` + val.id + `'>
                Ver
              </button>
              <button class='btn btn-info m-r-10px update-product-button' data-id='` + val.id + `'>
                Editar
              </button>
              <button class='btn btn-danger delete-product-button' data-id='` + val.id + `'>
                Excluir
              </button>
            </td>
          </tr>`;
      });
    }
  })
  .fail(function(textStatus, errorThrown) {
    console.log("erro: ", textStatus, errorThrown);
  });
  
  return read_products;
}

function showProducts(read_products_to_html) {
  var read_products_html = `
    <div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
      <!--span class='glyphicon glyphicon-plus'></span--> 
      Criar Produto
    </div>
    <table class='table table-bordered table-hover'>
   
      <!-- creating our table heading -->
      <tr>
        <th class='w-25-pct'>Nome</th>
        <th class='w-10-pct'>Preço</th>
        <th class='w-15-pct'>Categoria</th>
        <th class='w-25-pct text-align-center'>Ações</th>
      </tr>`;
  
  read_products_html += read_products_to_html;
  read_products_html += `</table>`;
  
  $("#page-content").html(read_products_html);
  
  changePageTitle("Listar Produtos");
}