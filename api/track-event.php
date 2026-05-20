<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok'=>false,'error'=>'method_not_allowed']); exit; }
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { http_response_code(400); echo json_encode(['ok'=>false,'error'=>'invalid_json']); exit; }
$required=['event','page_path','timestamp'];
foreach($required as $f){ if(empty($data[$f])){ http_response_code(422); echo json_encode(['ok'=>false,'error'=>'missing_'.$f]); exit; }}
$logDir = __DIR__ . '/../storage';
if (!is_dir($logDir)) { mkdir($logDir, 0755, true); }
$line = json_encode($data, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) . PHP_EOL;
file_put_contents($logDir.'/tracking-events.log', $line, FILE_APPEND | LOCK_EX);
echo json_encode(['ok'=>true]);
