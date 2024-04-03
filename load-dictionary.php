if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Читаем данные из файла
    $jsonData = file_get_contents("dictionary.json");

    // Проверяем, удалось ли прочитать файл
    if ($jsonData === false) {
        // Если чтение файла не удалось, возвращаем ошибку
        http_response_code(500); // Внутренняя ошибка сервера
        exit;
    }

    // Возвращаем JSON-данные
    header('Content-Type: application/json');
    echo $jsonData;
} else {
    // Если запрос не был GET, возвращаем ошибку
    http_response_code(405); // Метод не разрешен
}
