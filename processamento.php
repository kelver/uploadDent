<?php
require('function/upload.php');
if($_FILES){
    upload($_FILES);
}