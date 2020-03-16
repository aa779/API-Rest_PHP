<?php
  class Product {
    private $conn;
    private $table_name = "produtos";

    public $id;
    public $nome;
    public $descricao;
    public $preco;
    public $categoria_id;
    public $categoria_nome;
    public $criacao;

    public function __construct($db) {
      $this->conn = $db;
    }

    function read() {
      $query = "SELECT c.nome AS categoria_nome, p.id, p.nome, p.descricao, p.preco, p.categoria_id, p.criacao
                FROM " . $this->table_name . " p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                ORDER BY p.criacao DESC;";
   
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      return $stmt;
    }
    
    function create() {
      $query = "INSERT INTO " . $this->table_name . "
                SET nome = :nome, preco = :preco, descricao = :descricao, categoria_id = :categoria_id, criacao = :criacao;";
   
      $stmt = $this->conn->prepare($query);
   
      $this->nome         = htmlspecialchars(strip_tags($this->nome));
      $this->preco        = htmlspecialchars(strip_tags($this->preco));
      $this->descricao    = htmlspecialchars(strip_tags($this->descricao));
      $this->categoria_id = htmlspecialchars(strip_tags($this->categoria_id));
      $this->criacao      = htmlspecialchars(strip_tags($this->criacao));
   
      $stmt->bindParam(":nome",         $this->nome);
      $stmt->bindParam(":preco",        $this->preco);
      $stmt->bindParam(":descricao",    $this->descricao);
      $stmt->bindParam(":categoria_id", $this->categoria_id);
      $stmt->bindParam(":criacao",      $this->criacao);
   
      if ($stmt->execute())
        return true;
      else
        return false;
    }
    
    function readOne() {
      $query = "SELECT c.nome AS categoria_nome, p.id, p.nome, p.descricao, p.preco, p.categoria_id, p.criacao
                FROM " . $this->table_name . " p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                WHERE p.id = ?
                LIMIT 0, 1;";
   
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();
   
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      $this->nome      = $row['nome'];//$stmt->errorInfo();//
      $this->preco     = $row['preco'];
      $this->descricao = $row['descricao'];
      $this->categoria_id   = $row['categoria_id'];
      $this->categoria_nome = $row['categoria_nome'];
    }
    
    function update(){
      $query = "UPDATE " . $this->table_name . "
                SET nome = :nome, preco = :preco, descricao = :descricao, categoria_id = :categoria_id
                WHERE id = :id;";
   
      $stmt = $this->conn->prepare($query);
   
      $this->nome         = htmlspecialchars(strip_tags($this->nome));
      $this->preco        = htmlspecialchars(strip_tags($this->preco));
      $this->descricao    = htmlspecialchars(strip_tags($this->descricao));
      $this->categoria_id = htmlspecialchars(strip_tags($this->categoria_id));
      $this->id           = htmlspecialchars(strip_tags($this->id));
   
      $stmt->bindParam(':nome',         $this->nome);
      $stmt->bindParam(':preco',        $this->preco);
      $stmt->bindParam(':descricao',    $this->descricao);
      $stmt->bindParam(':categoria_id', $this->categoria_id);
      $stmt->bindParam(':id',           $this->id);
   
      if ($stmt->execute())
        return true;
      else
        return false;
    }

    function erase() {
      $query = "DELETE FROM " . $this->table_name . " WHERE id = ?;";
   
      $stmt = $this->conn->prepare($query);
   
      $this->id = htmlspecialchars(strip_tags($this->id));
   
      $stmt->bindParam(1, $this->id);
   
      if ($stmt->execute())
        if ($stmt->rowCount() > 0)
          return true;
        else
          return false;
      else
        return false;
    }

    function search($keywords){
      $query = "SELECT c.nome as categoria_nome, p.id, p.nome, p.descricao, p.preco, p.categoria_id, p.criacao
                FROM " . $this->table_name . " p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                WHERE p.nome LIKE ? OR p.descricao LIKE ? OR c.nome LIKE ?
                ORDER BY p.criacao DESC;";
   
      $stmt = $this->conn->prepare($query);
      
      $keywords = htmlspecialchars(strip_tags($keywords));
      $keywords = "%{$keywords}%";
   
      $stmt->bindParam(1, $keywords);
      $stmt->bindParam(2, $keywords);
      $stmt->bindParam(3, $keywords);
      $stmt->execute();
      
      return $stmt;
    }

    public function readPaging($from_record_num, $records_per_page){
      $query = "SELECT c.nome AS categoria_nome, p.id, p.nome, p.descricao, p.preco, p.categoria_id, p.criacao
                FROM " . $this->table_name . " p
                LEFT JOIN categorias c ON p.categoria_id = c.id
                ORDER BY p.criacao DESC
                LIMIT ?, ?;";
   
      $stmt = $this->conn->prepare($query);
   
      $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
      $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
      $stmt->execute();
      
      return $stmt;
    }
    
    public function count(){
      $query = "SELECT COUNT(*) AS total_rows FROM " . $this->table_name . ";";
   
      $stmt = $this->conn->prepare( $query );
      $stmt->execute();
      $row = $stmt->fetch(PDO::FETCH_ASSOC);
   
      return $row['total_rows'];
    }
  }
?>