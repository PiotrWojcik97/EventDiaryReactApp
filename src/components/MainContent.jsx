import React from "react"
import Month from "./Month"

export default function MainContent(props) {
    return (
        <main>
            {
                props.isAboutActive
                ?
                    <div className="about-div">
                    <h2 className="title">About App</h2>
                    <span>
                        You can use this application to visualize events and processes.
                        (within process occur time differs from finishing time, whereas in event it remains the same)
                    </span>
                    <h2 className="title">App Usage</h2>
                    <span>
                        To be able to create and delete events You need to login first. Below are credentials:
                        <div className="about-table">
                            <div>
                                <div>login</div>
                                <div>password</div>
                            </div>
                            <div>
                                <div>admin</div>
                                <div>admin</div>
                            </div>
                        </div>
                    </span>
                    <h2 className="title">Used Tools</h2>
                    <span>
                        Application is divided to front and back end. Front is written in React, backend is written in PHP.<br />
                        Communication between front and back end is done by REST API.<br />
                        Data such as events and accounts are stored in MySQL database.<br />
                        React App, PHP and MySQL are deployed to Azure cloud.<br />
                        Project repositories can be found on github:<br />
                        -
                    </span>
                    <a href="https://github.com/PiotrWojcik97/EventDiaryReactApp">React</a><br />
                    <span>-</span>
                    <a href="https://github.com/PiotrWojcik97/EventDiaryPHPBackend">PHP</a><br />
                    <h2 className="title">Project Requirements</h2>
                    <span>
                        Specyfikacja funkcjonalna aplikacji:
                        1. Zdarzenie rozumiemy jako punkt na osi czasu charakteryzujący się następującymi cechami:
                        1. nazwa zdarzenia,
                        2. data zaistnienia zdarzenia (dzień, miesiąc, rok),
                        3. krótki opis tekstowy,
                        4. szczegółowy opis tekstowy,
                        5. ilustracja graficzna,
                        6. typ zdarzenia / procesu.
                        2. Procesy rozumiemy jako odcinki na osi czasu charakteryzujące się tymi samymi cechami,
                        co zdarzenia, ale z tą różnicą, że określona jest data rozpoczęcia i data zakończenia procesu.
                        3. Typy pozwalają powiązać ze sobą podobne wydarzenia i np. wyświetlić je w sposób
                        charakterystyczny. Typ powinien mieć edytowalną nazwę oraz konfigurowalną jakąś cechę
                        graficzną (np. kolor lub/i ikonę).
                        4. Są dwie grupy użytkowników: czytelnicy (niezalogowani) i administratorzy (zalogowany).
                        5. Użytkownicy niezalogowani mogą swobodnie przeglądać zawartość pamiętnika, ale bez
                        możliwości edycji wpisów.
                        6. Administratorzy mogą zarówno przeglądać zawartość jak i ją edytować (operacje CRUD na
                        zdarzeniach, procesach i typach).
                        7. Każdy użytkownik może wydrukować pełną zawartość pamiętnika w czytelny sposób.
                        Drukowanie powinno być zrealizowane przez odpowiednio przygotowany za pomocą CSS
                        widok pozbawiony kontrolek sterujących aplikacji.
                        8. Zadbać o właściwe przechowywanie hasła dostępowego i możliwość jego zmiany przez
                        zalogowanego użytkownika. Mechanizm samodzielnej rejestracji nowych użytkowników
                        nie jest wymagany.
                        9. Zadbać o estetyczną formę prezentacji pamiętnika. Można skorzystać z bibliotek JS, które
                        ułatwiają oznaczanie zdarzeń na osi czasu, można spróbować samodzielnej implementacji z
                        użyciem odpowiednio przygotowanego arkusza CSS i elementów języka HTML5.
                        10. Kliknięcie w dane zdarzenie / proces na osi czasu powinno wyświetlać pełen opis danego
                        elementu.
                        
                        Wymagania techniczne:
                        • proszę wykorzystać technologie PHP, MariaDB / MySQL, HTML, JavaScript, CSS we
                        współczesnych wersjach (w miarę możliwości),
                        • zaprojektować relacyjną bazę danych adekwatną do postawionego problemu: dobrać
                        odpowiednie typy pól, zaplanować zależności pomiędzy tabelami, zastosować klucze obce,
                        • zachęcam do korzystania z frameworków, ale nie ma takiego wymogu; tym samym np.
                        mechanizm uwierzytelniania użytkownika może zostać stworzony samodzielnie (można
                        wykorzystywać materiały dołączone do kursu); użycie frameworka upraszcza pewne
                        kwestie implementacyjne, ale wymaga zrozumienia i poznania samego frameworka – wybór
                        leży w gestii Studenta,
                        • aplikacja powinna zapewniać choćby w minimalnym stopniu bezpieczeństwo przed
                        włamaniami:
                        ◦ zastosować zabezpieczenie przed SQL-Injection,
                        ◦ hasła użytkowników muszą być przechowywane w bazie w formie hashy.
                        Stronę należy umieścić na dowolnym publicznie dostępnym serwerze w sieci Internet.


                        Rozwiązanie należy załadować na platformę OKNO w wyznaczonym terminie i powinno ono
                        zawierać:
                        • kody źródłowe zaimplementowanego systemu (wraz z kodami ewentualnych bibliotek
                        zewnętrznych),
                        • skrypty tworzące bazę danych zawierającą tabele z przykładową zawartością pozwalającą na
                        zapoznanie się z funkcjonalnością aplikacji,
                        • dokumentację projektu składającą się z:
                        ◦ opisu konfiguracji serwera i uruchomienia witryny (w tym działające dane logowania),
                        ◦ adresu URL serwera, na którym umieszczono stronę,
                        ◦ opis wybranej struktury bazy danych (znaczenie poszczególnych tabel, ich pól, relacji
                        itp.),
                        ◦ opisu kodu stworzonej aplikacji (krótka informacja wskazująca, za co odpowiadają
                        kluczowe funkcje/pliki/klasy),
                        ◦ przykładowe zrzuty ekranu.
                    </span>
                    </div>
                :
                    <Month 
                        month={props.currentMonth} 
                        toggleEventModal={props.toggleEventModal}
                        changeMonth={props.changeMonth}
                        eventArray={props.eventArray}
                        toggleModalEventContent={props.toggleModalEventContent}
                    />
            }
        </main>
    )
}