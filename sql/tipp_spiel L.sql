-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Mai 2024 um 11:15
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `tipp_spiel`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `europameister`
--

CREATE TABLE `europameister` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mannschaft` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `spiele`
--

CREATE TABLE `spiele` (
  `id` int(50) NOT NULL,
  `home_id` int(50) NOT NULL,
  `home_name` varchar(50) NOT NULL,
  `home_score` int(50) NOT NULL,
  `away_id` int(50) NOT NULL,
  `away_name` varchar(50) NOT NULL,
  `away_score` int(50) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` time(6) NOT NULL,
  `ausgang` varchar(50) NOT NULL,
  `api_id` int(50) NOT NULL,
  `home_flag` varchar(100) NOT NULL,
  `away_flag` varchar(100) NOT NULL,
  `home_penalty` varchar(50) NOT NULL DEFAULT 'null',
  `away_penalty` varchar(50) NOT NULL DEFAULT 'null'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `spiele`
--

INSERT INTO `spiele` (`id`, `home_id`, `home_name`, `home_score`, `away_id`, `away_name`, `away_score`, `date`, `time`, `ausgang`, `api_id`, `home_flag`, `away_flag`, `home_penalty`, `away_penalty`) VALUES
(1, 0, 'deutschland', 0, 0, 'schottland', 0, '14.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(2, 0, 'ungarn', 0, 0, 'schweiz', 0, '15.06.2024', '15:00:00.000000', 'null', 1145510, '', '', 'null', 'null'),
(3, 0, 'spanien', 0, 0, 'kroatien', 0, '15.06.2024', '18:00:00.000000', 'null', 1145511, '', '', 'null', 'null'),
(4, 0, 'italien', 0, 0, 'albanien', 0, '15.06.2024', '21:00:00.000000', 'null', 1145512, '', '', 'null', 'null'),
(5, 0, 'polen', 0, 0, 'niederlande', 0, '16.06.2024', '15:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(6, 0, 'slowenien', 0, 0, 'danemark', 0, '16.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(7, 0, 'serbien', 0, 0, 'england', 0, '16.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(8, 0, 'rumanien', 0, 0, 'ukraine', 0, '17.06.2024', '15:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(9, 0, 'belgien', 0, 0, 'slowakei', 0, '17.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(10, 0, 'osterreich', 0, 0, 'frankreich', 0, '17.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(11, 0, 'turkei', 0, 0, 'georgien', 0, '18.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(12, 0, 'portugal', 0, 0, 'tschechien', 0, '18.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(13, 0, 'kroatien', 0, 0, 'albanien', 0, '19.06.2024', '15:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(14, 0, 'deutschland', 0, 0, 'ungarn', 0, '19.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(15, 0, 'schottland', 0, 0, 'schweiz', 0, '19.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(16, 0, 'slowenien', 0, 0, 'serbien', 0, '20.06.2024', '15:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(17, 0, 'danemark', 0, 0, 'england', 0, '20.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(18, 0, 'spanien', 0, 0, 'italien', 0, '20.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(19, 0, 'slowakei', 0, 0, 'ukraine', 0, '21.06.2024', '15:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(20, 0, 'polen', 0, 0, 'osterreich', 0, '21.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(21, 0, 'niederlande', 0, 0, 'frankreich', 0, '21.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(22, 0, 'georgien', 0, 0, 'tschechien', 0, '22.06.2024', '15:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(23, 0, 'turkei', 0, 0, 'portugal', 0, '22.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(24, 0, 'belgien', 0, 0, 'rumanien', 0, '22.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(25, 0, 'schweiz', 0, 0, 'deutschland', 0, '23.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(26, 0, 'schottland', 0, 0, 'ungarn', 0, '23.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(27, 0, 'albanien', 0, 0, 'spanien', 0, '24.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(28, 0, 'kroatien', 0, 0, 'italien', 0, '24.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(29, 0, 'frankreich', 0, 0, 'polen', 0, '25.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(30, 0, 'niederlande', 0, 0, 'osterreich', 0, '25.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(31, 0, 'danemark', 0, 0, 'serbien', 0, '25.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(32, 0, 'england', 0, 0, 'slowenien', 0, '25.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(33, 0, 'slowakei', 0, 0, 'rumanien', 0, '26.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(34, 0, 'ukraine', 0, 0, 'belgien', 0, '26.06.2024', '18:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(35, 0, 'georgien', 0, 0, 'portugal', 0, '26.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(36, 0, 'tschechien', 0, 0, 'turkei', 0, '26.06.2024', '21:00:00.000000', 'null', 0, '', '', 'null', 'null'),
(37, 541, 'Real Madrid', 0, 157, 'Bayern Munich', 0, '23.05.2024', '21:00:00.000000', 'null', 1196544, 'null', 'null', 'null', 'null'),
(38, 85, 'Paris Saint Germain', 0, 165, 'Borussia Dortmund', 0, '23.05.2024', '21:00:00.000000', 'null', 1196502, 'null', 'null', 'null', 'null');

--
-- Trigger `spiele`
--
DELIMITER $$
CREATE TRIGGER `Check_Tipp` AFTER UPDATE ON `spiele` FOR EACH ROW BEGIN
  UPDATE tipp
  INNER JOIN spiele ON tipp.match_id = spiele.id
  SET tipp.recived_points = 3,
  tipp.status = 'erledigt',
  tipp.recive_date = now()
  WHERE tipp.home_score = spiele.home_score
    AND tipp.away_score = spiele.away_score and spiele.ausgang != 'null';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Check_Tipp_Teil` AFTER UPDATE ON `spiele` FOR EACH ROW BEGIN
  UPDATE tipp
  INNER JOIN spiele ON tipp.match_id = spiele.id
  SET tipp.recived_points = 1,
  tipp.status = 'erledigt',
  tipp.recive_date = now()
  WHERE spiele.ausgang != 'null'
    AND (
      (tipp.home_score != spiele.home_score OR tipp.away_score != spiele.away_score)
      AND (
        (spiele.home_score > spiele.away_score AND tipp.home_score > tipp.away_score)
        OR (spiele.home_score < spiele.away_score AND tipp.home_score < tipp.away_score)
        OR (spiele.home_score = spiele.away_score AND tipp.home_score = tipp.away_score)
      )
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Check_Tipp_X` AFTER UPDATE ON `spiele` FOR EACH ROW BEGIN
  UPDATE tipp
  INNER JOIN spiele ON tipp.match_id = spiele.id
  SET tipp.recived_points = 0,
  tipp.status = 'erledigt',
  tipp.recive_date = now()
  WHERE spiele.ausgang != 'null'
    AND (
      (tipp.home_score != spiele.home_score OR tipp.away_score != spiele.away_score)
      AND (
        (spiele.home_score > spiele.away_score AND tipp.home_score < tipp.away_score)
        OR (spiele.home_score < spiele.away_score AND tipp.home_score > tipp.away_score)
        OR (spiele.home_score = spiele.away_score AND tipp.home_score != tipp.away_score)
      )
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE `team` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`id`, `name`) VALUES
(3, 'Klinge'),
(4, 'OTM'),
(5, 'Rest');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tipp`
--

CREATE TABLE `tipp` (
  `id` int(100) NOT NULL,
  `user_id` int(50) NOT NULL,
  `match_id` int(50) NOT NULL,
  `match_date` varchar(50) NOT NULL,
  `home_team` varchar(50) NOT NULL,
  `away_team` varchar(50) NOT NULL,
  `home_score` int(50) NOT NULL,
  `away_score` int(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `recive_date` varchar(50) NOT NULL,
  `recived_points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `tipp`
--

INSERT INTO `tipp` (`id`, `user_id`, `match_id`, `match_date`, `home_team`, `away_team`, `home_score`, `away_score`, `status`, `recive_date`, `recived_points`) VALUES
(3, 3, 11, '18.06.2024', 'Turkei', 'Georgien', 0, 10, 'offen', 'null', 0),
(4, 3, 14, '19.06.2024', 'Deutschland', 'Ungarn', 5, 0, 'offen', 'null', 0),
(5, 3, 34, '26.06.2024', 'Ukraine', 'Belgien', 1, 4, 'offen', 'null', 0),
(6, 3, 1, '14.06.2024', 'Deutschland', 'Schottland', 4, 0, 'erledigt', '2024-05-22 10:16:27', 3),
(7, 3, 6, '16.06.2024', 'Slowenien', 'Danemark', 2, 2, 'offen', 'null', 0),
(8, 3, 3, '15.06.2024', 'Spanien', 'Kroatien', 3, 0, 'offen', 'null', 0),
(9, 9, 1, '14.06.2024', 'Deutschland', 'Schottland', 4, 0, 'erledigt', '2024-05-22 10:16:27', 3),
(10, 9, 3, '15.06.2024', 'Spanien', 'Kroatien', 2, 2, 'offen', 'null', 0),
(11, 9, 4, '15.06.2024', 'Italien', 'Albanien', 3, 0, 'offen', '	\n2024-05-15 09:29:04\n', 5),
(12, 3, 10, '17.06.2024', 'Osterreich', 'Frankreich', 2, 2, 'offen', '	\n2024-04-22 09:29:04\n', 5),
(13, 3, 2, '15.06.2024', 'Ungarn', 'Schweiz', 1, 0, 'erledigt', '2024-05-22 10:13:46', 1),
(14, 3, 8, '17.06.2024', 'Rumanien', 'Ukraine', 0, 0, 'offen', 'null', 0),
(15, 10, 1, '14.06.2024', 'Deutschland', 'Schottland', 2, 0, 'erledigt', '2024-05-22 10:16:27', 1),
(16, 10, 2, '15.06.2024', 'Ungarn', 'Schweiz', 2, 2, 'offen', 'null', 0),
(17, 3, 37, '23.05.2024', 'Real Madrid', 'Bayern Munich', 2, 1, 'erledigt', '2024-05-28 08:45:24', 3),
(18, 3, 38, '23.05.2024', 'Paris Saint Germain', 'Borussia Dortmund', 0, 1, 'erledigt', '2024-05-28 09:25:05', 3),
(19, 3, 36, '26.06.2024', 'Tschechien', 'Turkei', 2, 0, 'offen', 'null', 0),
(20, 3, 23, '22.06.2024', 'Turkei', 'Portugal', 0, 22, 'offen', 'null', 0);

--
-- Trigger `tipp`
--
DELIMITER $$
CREATE TRIGGER `Punkte_Update` AFTER UPDATE ON `tipp` FOR EACH ROW BEGIN UPDATE users
    SET punkte = punkte - OLD.recived_points + NEW.recived_points
    WHERE id = OLD.user_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `punkte` int(50) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `team_id` int(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `vorname` varchar(50) NOT NULL,
  `nachname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `punkte`, `password`, `team_id`, `nickname`, `vorname`, `nachname`) VALUES
(1, 'mahmoud10', 0, '$2b$10$A4.GteZ5JfOvJ4wLZTy.SeXdbZH//qLvGp.sPL4cCl9JMAjrKHJxu', 3, 'test1', 'Mahmoud', 'Khalaf'),
(2, 'vinii', 0, '123123', 3, 'test2', 'Vinni', 'Vinni'),
(3, 'test@test.com', 15, '$2b$10$QDfiNSN0gEwKrHDJ0hSOROlqtY4M6My7GO/FBylNu5H1sFNK61.mW', 3, 'Besterspieler', 'Mahmoud', 'Khalaf'),
(4, 'vinni@test.com', 0, '$2b$10$R8ztm9sNnu2rql4ALP5NMugKK6xI/ss86C9Z3e.5AY9z2PyjB6LhK', 5, 'Auto', 'Vinni', 'Azubi'),
(5, 'test@mail.com', 0, '$2b$10$Y2fnslMNhCDukGFESoRI4.yNNh0QTbGFHpBow2KFoQSbUNYZdaFva', 3, 'Auto1', 'Vincenzo', 'Lamanuzzi'),
(7, 'vinni@lamanuzzi.de', 0, '$2b$10$a6JAVBwrv63AxfoxzC/33utFLC90H1nHj36u4VBrErQGRi5qNkwPu', 3, 'AUTOOO', 'Vincenzo', 'Lamanuzzi'),
(8, 'test@test.de', 0, '$2b$10$u8mDfj8ouvX5adTMIGkn4elgvtMVs6dnA/J6QsRilj8b5voYMJH.u', 3, 'testautoo', 'test', 'test'),
(9, 'test2@test.com', 8, '$2b$10$gLrA9mQsXyKLSS4lrJ.rTudqxSqHi9zg47AfYfY8fT8MhHEoYKL8S', 3, 'ZweiterSpieler', 'test', 'test'),
(10, 'test11@test.com', 1, '$2b$10$P1wBv9mK67XsmF5vHf6KduHyzdnk7TVxtFvf0JOUWAMMwXOA/Ef5u', 4, 'test121', 'Mahmoud', 'Khalaf'),
(15, 'test7777@test.com', 0, '$2b$10$Vs22A9F2TOd1R.J9MPIqZuHSzRtaPlysMAhRAhDZeoHEPGjciNmXO', 4, 'test7777', 'Mahmoud', 'Khalaf'),
(16, 'test8888@test.com', 0, '$2b$10$mFPHCGwlUPcjfqgj/J39..cqoM.0Xv4M8T//ncESPG40aWAb/8qzC', 4, 'test1123123', '12312', '123123');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `europameister`
--
ALTER TABLE `europameister`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `spiele`
--
ALTER TABLE `spiele`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `tipp`
--
ALTER TABLE `tipp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `europameister`
--
ALTER TABLE `europameister`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `spiele`
--
ALTER TABLE `spiele`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `tipp`
--
ALTER TABLE `tipp`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `tipp`
--
ALTER TABLE `tipp`
  ADD CONSTRAINT `tipp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
