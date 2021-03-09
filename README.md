# First js project for pup2

## Collaborators:
1. Ewa Zalewska
2. Jakub Lewandowski
3. Bartłomiej Gędek
4. Damian Galiński
5. Oliwier Matynia
6. Michał Sobieszczyk
7. Hubert Baranowski
8. Piotr Cinkusz

## Tasks (number represents collaborator) - 1

Wspólnie musicie stworzyć aplikację do obsługi eventów typu koncerty, spotkania z autorami ksiązek, itp.

Dane powinny być trzymane w pliku .json, aczkolwiek fajnie by było połączyć aplikację z lokalną bazą danych sql.

Kazdy endpoint powinien być podzielony na jak najwięcej metod, które później zostaną otestowane za pomocą biblioteki jest

Kazdy swoją pracę wykonuje na swoim branchu. Następnie robi Pull Requesta, którego muszą zaakceptować inni

1. Logowanie, rejestracja
2. Wyświetlenie aktualnie dostępnych eventów (te które dopiero się odbędą)
3. Dodanie nowego eventu
4. Wygenerowanie faktury dla eventu (wykorzystaj dowolną bibliotekę z npm.js do generowania faktur)
5. Usunięcie danego eventu
6. Edycja eventu
7. Zapisanie się na dany event, opłacenie go, mozliwość wycofania się
8. Filtrowanie eventów bo danej ceche (rodzaj, cena, data, itp)

## Tasks (number represents collaborator) - 2

Rozszerzenie aplikacji o moduł bazy danych w sql'u - każdy niech stworzy lokalną bazę i utworzy połączenie (struktura bazy powinna odzwierciedlać dotychczasowy plik .json)

Cały serwer powinien się teraz znaleźć w jednym katalogu.

Stwórzcie drugi katalog o nazwie client gdzie znajdzie się aplikacja kliencka w reaccie, która będzie korzystać z dotychczasowych endpointów

1. Przerobienie pod logowanie / rejestrację z bazą danych
2. Refactoring kodu, wszystkie metody muszą się znaleźć w jednej klasie utils. Napisanie unit testów
3. Przerobienie dotychczasowych funkcjonalności pod korzystanie z bazy danych
4. Szkielet aplikacji webowej w reaccie która znajdzie się w katalogu client
5. Pomoc Damianowi w aplikacji webowej
6. Przerobienie dotychczasowych funkcjonalności pod korzystanie z bazy danych + funkcjonalności Oliwiera
7. Diagram erd bazy danych plus moduł łączenia z bazą danych
8. Przerobienie dotychczasowych funkcjonalności pod korzystanie z bazy danych

Przerobienie MySql'a pod łączenie się z bazą danych:
```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';```
```flush privileges;```
