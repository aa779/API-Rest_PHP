<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   
  include_once '../config/database.php';
  include_once '../objects/product.php';
   
  $database = new Database();
  $db       = $database->getConnection();
   
  $product = new Product($db);
  $data    = json_decode(file_get_contents("php://input"));
   
  $product->id           = $data->id;
  $product->nome         = $data->nome;
  $product->preco        = $data->preco;
  $product->descricao    = $data->descricao;
  $product->categoria_id = $data->categoria_id;
   
  if ($product->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Produto foi alterado"));
  }
  else {
    http_response_code(503);
    echo json_encode(array("message" => "Erro ao alterar produto"));
  }
?>