# Yandex Metrika goals

## Counter

- Counter ID: `110429323`

## Goals created — 2026-07-09

### 1. Проверка звонка завершена

- Goal ID: `581204378`
- JavaScript event: `call_checker_finished`
- Triggered after the user completes the suspicious call checker.

### 2. Проверка перевода завершена

- Goal ID: `581204789`
- JavaScript event: `money_checker_finished`
- Triggered after the user completes the money request checker.

### 3. Семейная памятка создана

- Goal ID: `581205060`
- JavaScript event: `family_code_generated`
- Triggered after the family safety memo is generated.

### 4. Ссылка на инструкцию скопирована

- Goal ID: `581205375`
- JavaScript event: `article_share_copy_url`
- Triggered when the user copies a link from the “Сохранить или отправить близким” block on an informational page.

### 5. Семейная памятка скопирована

- Goal ID: `581205721`
- JavaScript event: `family_memo_copy`
- Triggered when the user copies the generated family memo.

## Automatic goal

Yandex Metrika also created an automatic goal:

- `Автоцель: отправка формы`
- Goal ID: `579304220`

This goal can remain enabled. It is not a replacement for the custom JavaScript goals above.

## Recommended test

1. Open `https://dexhtml.github.io/check-before-action/tools/proverka-zvonka.html`.
2. Complete the checker and show the result.
3. Wait 5–30 minutes.
4. Open Metrika → Goals / Conversions.
5. Check whether `Проверка звонка завершена` received one conversion.

## What to monitor later

- completions of both checkers;
- family memo generation;
- copied article links;
- copied family memos;
- conversion rate from visits to completed checks;
- which landing pages lead to tool completions.
