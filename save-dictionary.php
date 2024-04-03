if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем JSON-данные из тела запроса
    $jsonContent = file_get_contents('php://input');
    
    // Здесь можно выполнить дополнительные проверки и обработку данных, если нужно

    // Записываем данные в файл
    $file = fopen("dictionary.json", "w");
    fwrite($file, $jsonContent);
    fclose($file);

    // Отправляем успешный ответ
    http_response_code(200);
} else {
    // Если запрос не был POST, возвращаем ошибку
    http_response_code(405); // Метод не разрешен
}
