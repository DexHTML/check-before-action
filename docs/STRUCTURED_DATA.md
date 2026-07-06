# Structured data layer

## Что добавлено

В общий файл `assets/js/main.js` добавлена динамическая JSON-LD микроразметка `FAQPage` для ключевых страниц проекта.

Дополнительно добавлены видимые FAQ-блоки для этих же страниц:

- на странице `pages/perevel-dengi-moshennikam.html` FAQ-блок добавлен статически в HTML;
- на остальных страницах FAQ-блок подставляется через общий JavaScript, если на странице ещё нет `.faq-block`.

## Страницы с FAQPage

- `pages/perevel-dengi-moshennikam.html`
- `pages/skazal-kod-iz-sms.html`
- `pages/vvel-dannye-karty.html`
- `pages/prislali-ssylku-na-dostavku.html`
- `pages/zvonyat-iz-banka-prosyat-perevesti-na-bezopasnyy-schet.html`
- `pages/ustanovil-prilozhenie-po-prosbe-zvonyashchego.html`
- `pages/postavshchik-smenil-rekvizity.html`

## Зачем это нужно

- Помогает поисковикам лучше понять структуру вопрос-ответ.
- Усиливает страницы, где пользователь ищет срочный ответ.
- Даёт пользователю быстрые ответы внизу страницы.
- Уменьшает разрыв между видимым содержимым страницы и JSON-LD разметкой.
- Не требует отдельного дублирования JSON-LD в каждой HTML-странице.

## Ограничение

Разметка и часть видимых FAQ-блоков добавляются через JavaScript. Для Google это обычно приемлемо при рендеринге страницы, но при будущем переносе на PHP/сервер лучше сделать статическую вставку JSON-LD и FAQ-блоков прямо в HTML-шаблон.

## Правило качества

Текст в разметке должен совпадать по смыслу с видимым содержанием страницы. Нельзя добавлять в JSON-LD вопросы и ответы, которых нет или почти нет в видимом тексте.
