<?php
error_reporting(E_ALL);
function upload($arquivo)
{
    clearstatcache();
    $dir = "assets/fotos/" . date('Ymd');
    if (!file_exists($dir)) {
        @mkdir($dir, 0777, true);
    }

    if (file_exists($dir)) {
        // Verifica se o upload foi enviado via POST
        if (is_uploaded_file($_FILES['imagem']['tmp_name'])) {
            // Monta o caminho de destino com o nome do arquivo
            $nomeImg = explode('.', $_FILES['imagem']['name']);
            $nomeIni = $dir . '/' . date('his') . '_' . $nomeImg[0];
            $nome_escudo = $nomeIni . '.' . $nomeImg[1];
            $nome_escudo_cp = $nomeIni . '_cp.' . $nomeImg[1];
            $nomeTmp = $_FILES['imagem']['tmp_name'];

            // Essa função move_uploaded_file() copia e verifica se o arquivo enviado foi copiado com sucesso para o destino
            if (!move_uploaded_file($nomeTmp, $nome_escudo)) {
                $retorno = array('status' => 0, 'mensagem' => '1Houve um erro ao gravar arquivo na pasta de destino!');
                echo json_encode($retorno);
                exit();
            }
            if (!copy($nome_escudo, $nome_escudo_cp)) {
                $retorno = array('status' => 0, 'mensagem' => '2Houve um erro ao gravar arquivo na pasta de destino!');
                echo json_encode($retorno);
                exit();
            }

            echo json_encode(['status' => 1, 'file' => $nome_escudo, 'file_cp' => $nome_escudo_cp], 200, JSON_UNESCAPED_UNICODE);
        }
    }
}
