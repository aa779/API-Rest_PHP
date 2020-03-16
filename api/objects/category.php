<?php
  class Category {
    private $conn;
    private $table_name = "categorias";
 
    public $id;
    public $nome;
    public $descricao;
    public $criacao;
 
    public function __construct($db) {
      $this->conn = $db;
    }
 
    public function readAll() {
      $query = "SELECT id, nome, descricao
                FROM " . $this->table_name . "
                ORDER BY nome";

      $stmt = $this->conn->prepare($query);
      $stmt->execute();
      
      return $stmt;
    }
    
    public function read() {
      $query = "SELECT id, nome, descricao
                FROM " . $this->table_name . "
                ORDER BY nome";
   
      $stmt = $this->conn->prepare($query);
      $stmt->execute();
   
      return $stmt;
    }
  }
?>