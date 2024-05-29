-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Mai 2024 um 13:20
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
(37, 541, 'Real Madrid', 2, 157, 'Bayern Munich', 1, '23.05.2024', '21:00:00.000000', 'hw', 1196544, 'null', 'null', 'null', 'null'),
(38, 85, 'Paris Saint Germain', 0, 165, 'Borussia Dortmund', 1, '23.05.2024', '21:00:00.000000', 'aw', 1196502, 'null', 'null', 'null', 'null');

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
(1, 'Klinge'),
(2, 'Stephan'),
(3, 'Marc'),
(4, 'Carsten'),
(5, 'Jaqueline'),
(6, 'Jörg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tipp`
--

CREATE TABLE `tipp` (
  `id` int(100) NOT NULL,
  `user_id` int(50) NOT NULL,
  `match_id` int(50) NOT NULL,
  `match_date` varchar(50) NOT NULL,
  `home_abbr` varchar(50) NOT NULL,
  `away_abbr` varchar(50) NOT NULL,
  `home_score` int(50) NOT NULL,
  `away_score` int(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `recive_date` varchar(50) NOT NULL,
  `recived_points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `tipp`
--

INSERT INTO `tipp` (`id`, `user_id`, `match_id`, `match_date`, `home_abbr`, `away_abbr`, `home_score`, `away_score`, `status`, `recive_date`, `recived_points`) VALUES
(1, 1, 1, '14.06.2024', 'DE', 'SCO', 5, 0, 'erledigt', '2024-05-29 13:15:56', 1),
(2, 1, 5, '16.06.2024', 'PL', 'NL', 2, 2, 'erledigt', '2024-05-28 11:03:00', 3),
(3, 1, 11, '18.06.2024', 'TR', 'GE', 0, 11, 'erledigt', '2024-04-28 11:03:00', 6),
(4, 1, 29, '25.06.2024', 'FR', 'PL', 2, 2, 'offen', 'null', 0);

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
  `championship` varchar(50) NOT NULL,
  `uservalidation_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `punkte`, `password`, `team_id`, `nickname`, `championship`, `uservalidation_id`) VALUES
(1, 'test@test.com', 10, '$2b$10$SSLJDmIaXQxjIPnD2Dv9i.Fn4lBkohm.e4LoNCsx1Z20Du6f.1XqW', 6, 'Besterspieler', 'deutschland', 103);

--
-- Trigger `users`
--
DELIMITER $$
CREATE TRIGGER `user_used` AFTER INSERT ON `users` FOR EACH ROW BEGIN UPDATE uservalidation
    SET logged = 1
    WHERE id = NEW.uservalidation_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `uservalidation`
--

CREATE TABLE `uservalidation` (
  `id` int(11) NOT NULL,
  `vorname` varchar(50) NOT NULL,
  `nachname` varchar(50) NOT NULL,
  `team_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `logged` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `uservalidation`
--

INSERT INTO `uservalidation` (`id`, `vorname`, `nachname`, `team_id`, `timestamp`, `logged`) VALUES
(1, 'Claus-Christian', 'Diehl', 1, '0000-00-00 00:00:00', 0),
(3, 'Albert', 'Lerch', 1, '0000-00-00 00:00:00', 0),
(4, 'Andrea', 'Gründemann', 1, '0000-00-00 00:00:00', 0),
(5, 'Anne', 'Sievers', 1, '0000-00-00 00:00:00', 0),
(6, 'Bertrun', 'Goergens', 1, '0000-00-00 00:00:00', 0),
(7, 'Chris', 'Koch', 1, '0000-00-00 00:00:00', 0),
(8, 'Danny', 'Woosmann', 1, '0000-00-00 00:00:00', 0),
(9, 'Ina-Marie', 'Kuntze', 1, '0000-00-00 00:00:00', 0),
(10, 'Jörg', 'Heuer', 1, '0000-00-00 00:00:00', 0),
(11, 'Kelly Anne', 'Koch', 1, '0000-00-00 00:00:00', 0),
(12, 'Lars', 'Klingenspor', 1, '0000-00-00 00:00:00', 0),
(13, 'Linda', 'Urbaniak', 1, '0000-00-00 00:00:00', 0),
(14, 'Madeleine', 'Bendel', 1, '0000-00-00 00:00:00', 0),
(15, 'Michael', 'Schinhammer', 1, '0000-00-00 00:00:00', 0),
(16, 'Miriam', 'Hartenstein', 1, '0000-00-00 00:00:00', 0),
(17, 'Omar', 'Remmo', 1, '0000-00-00 00:00:00', 0),
(18, 'Osman', 'Demir', 1, '0000-00-00 00:00:00', 0),
(19, 'Rene', 'Gerisch', 1, '0000-00-00 00:00:00', 0),
(20, 'Rim', 'Nafil', 1, '0000-00-00 00:00:00', 0),
(21, 'Sibel', 'Aydogan', 1, '0000-00-00 00:00:00', 0),
(22, 'Thomas', 'Frank', 1, '0000-00-00 00:00:00', 0),
(23, 'Ugur', 'Yazici', 1, '0000-00-00 00:00:00', 0),
(24, 'Dominique', 'Raulf', 2, '0000-00-00 00:00:00', 0),
(25, 'Ioannis', 'Papageorgiou', 2, '0000-00-00 00:00:00', 0),
(26, 'Kerstin', 'Pinkernell', 2, '0000-00-00 00:00:00', 0),
(27, 'Martina', 'Vogelsang', 2, '0000-00-00 00:00:00', 0),
(28, 'Mirella', 'Weigelt', 2, '0000-00-00 00:00:00', 0),
(29, 'Nicole', 'Bendel', 2, '0000-00-00 00:00:00', 0),
(30, 'Rafael', 'Rodriguez', 2, '0000-00-00 00:00:00', 0),
(31, 'Stephan', 'Hedderich', 2, '0000-00-00 00:00:00', 0),
(32, 'Stephanie', 'Wiemann', 2, '0000-00-00 00:00:00', 0),
(33, 'Thomas', 'Kohn', 2, '0000-00-00 00:00:00', 0),
(34, 'Torsten', 'Brandt', 2, '0000-00-00 00:00:00', 0),
(35, 'Melanie', 'Kappel', 2, '0000-00-00 00:00:00', 0),
(36, 'Bianca', 'Capoccia', 3, '0000-00-00 00:00:00', 0),
(37, 'Ebru', 'Topcu', 3, '0000-00-00 00:00:00', 0),
(38, 'Evelyn', 'Neumann', 3, '0000-00-00 00:00:00', 0),
(39, 'Ferdi', 'Sendur', 3, '0000-00-00 00:00:00', 0),
(40, 'Halise', 'Abaci', 3, '0000-00-00 00:00:00', 0),
(41, 'Inken', 'Kannengiesser', 3, '0000-00-00 00:00:00', 0),
(42, 'Kinsey', 'Dincher', 3, '0000-00-00 00:00:00', 0),
(43, 'Marc', 'Boeckenhauer', 3, '0000-00-00 00:00:00', 0),
(44, 'Martina', 'Gruetzner', 3, '0000-00-00 00:00:00', 0),
(45, 'Nadine', 'Beissner', 3, '0000-00-00 00:00:00', 0),
(46, 'Nicole', 'Brunner', 3, '0000-00-00 00:00:00', 0),
(47, 'Panajiotis', 'Parcharidis', 3, '0000-00-00 00:00:00', 0),
(48, 'Ramona', 'Herrmuth', 3, '0000-00-00 00:00:00', 0),
(49, 'Regina', 'Elsenbach', 3, '0000-00-00 00:00:00', 0),
(50, 'Serhat', 'Elma', 3, '0000-00-00 00:00:00', 0),
(51, 'Stefanie', 'Dulsmann', 3, '0000-00-00 00:00:00', 0),
(52, 'Thomas', 'Jannsen', 3, '0000-00-00 00:00:00', 0),
(53, 'Torben', 'Blume', 3, '0000-00-00 00:00:00', 0),
(54, 'Andreas', 'Born', 4, '0000-00-00 00:00:00', 0),
(55, 'Armin Thomas', 'Bösch', 4, '0000-00-00 00:00:00', 0),
(56, 'Belal', 'Assaid', 4, '0000-00-00 00:00:00', 0),
(57, 'Carsten', 'Draeger', 4, '0000-00-00 00:00:00', 0),
(58, 'Carsten', 'Probst', 4, '0000-00-00 00:00:00', 0),
(59, 'Daniel', 'Puppa', 4, '0000-00-00 00:00:00', 0),
(60, 'David', 'Braumann', 4, '0000-00-00 00:00:00', 0),
(61, 'Edmund', 'Schock', 4, '0000-00-00 00:00:00', 0),
(62, 'Fabio', 'Maiorano', 4, '0000-00-00 00:00:00', 0),
(63, 'Frank', 'Jungerberg', 4, '0000-00-00 00:00:00', 0),
(64, 'Heiko', 'Hinrichs', 4, '0000-00-00 00:00:00', 0),
(65, 'Henrik', 'Schmitt', 4, '0000-00-00 00:00:00', 0),
(66, 'Katrin', 'Radetzky', 4, '0000-00-00 00:00:00', 0),
(67, 'Mandy', 'Fischer-Pietruszinski', 4, '0000-00-00 00:00:00', 0),
(68, 'Matthias', 'Jakobson', 4, '0000-00-00 00:00:00', 0),
(69, 'Melanie', 'Voelz', 4, '0000-00-00 00:00:00', 0),
(70, 'Nicole', 'Schumann', 4, '0000-00-00 00:00:00', 0),
(71, 'Niels', 'Kellner', 4, '0000-00-00 00:00:00', 0),
(73, 'Olliver', 'Wendig', 4, '0000-00-00 00:00:00', 0),
(74, 'Peter', 'Weiner', 4, '0000-00-00 00:00:00', 0),
(75, 'Steffan', 'Hardekopf', 4, '0000-00-00 00:00:00', 0),
(76, 'Uta', 'Kolze', 4, '0000-00-00 00:00:00', 0),
(77, 'Uwe', 'Schinkel', 4, '0000-00-00 00:00:00', 0),
(78, 'Anja', 'Wenk', 5, '0000-00-00 00:00:00', 0),
(79, 'Anke', 'Thonke', 5, '0000-00-00 00:00:00', 0),
(80, 'Daniel', 'Wagner', 5, '0000-00-00 00:00:00', 0),
(81, 'David', 'Grunewald', 5, '0000-00-00 00:00:00', 0),
(82, 'Doreen', 'Buchholz', 5, '0000-00-00 00:00:00', 0),
(83, 'Doris', 'Baberschke', 5, '0000-00-00 00:00:00', 0),
(84, 'Frank', 'Pietsch', 5, '0000-00-00 00:00:00', 0),
(85, 'Isabel', 'Krause', 5, '0000-00-00 00:00:00', 0),
(86, 'Jacqueline', 'Sterki', 5, '0000-00-00 00:00:00', 0),
(87, 'Jens', 'Jupe', 5, '0000-00-00 00:00:00', 0),
(88, 'Katharina', 'Laubert-Gnauck', 5, '0000-00-00 00:00:00', 0),
(89, 'Katja', 'Simon', 5, '0000-00-00 00:00:00', 0),
(90, 'Loic', 'Bretagnolle', 5, '0000-00-00 00:00:00', 0),
(91, 'Mario', 'Brugemeister', 5, '0000-00-00 00:00:00', 0),
(92, 'Marion', 'Boehm', 5, '0000-00-00 00:00:00', 0),
(93, 'Meiko', 'Huetter', 5, '0000-00-00 00:00:00', 0),
(94, 'Rene', 'Kusber', 5, '0000-00-00 00:00:00', 0),
(95, 'Roberto', 'Wolf', 5, '0000-00-00 00:00:00', 0),
(96, 'Sebastian', 'Brynda', 5, '0000-00-00 00:00:00', 0),
(97, 'Simona', 'Buder', 5, '0000-00-00 00:00:00', 0),
(98, 'Thomas', 'Dieckmann', 5, '0000-00-00 00:00:00', 0),
(99, 'Thomas', 'Laskow', 5, '0000-00-00 00:00:00', 0),
(100, 'Tony', 'Eberlein', 5, '0000-00-00 00:00:00', 0),
(101, 'Alexandra', 'Ippolito', 6, '0000-00-00 00:00:00', 0),
(102, 'Carola', 'Schulze', 6, '0000-00-00 00:00:00', 0),
(103, 'Mahmoud', 'Khalaf', 6, '2024-05-28 12:27:36', 1),
(104, 'Vincenzo', 'Lamanuzzi', 6, '0000-00-00 00:00:00', 0),
(105, 'Luis', 'Bittner', 6, '0000-00-00 00:00:00', 0),
(106, 'Jan', 'Wegner', 6, '0000-00-00 00:00:00', 0),
(107, 'Thomas', 'Lenz', 6, '0000-00-00 00:00:00', 0),
(108, 'Ricarda', 'Deutsch', 6, '0000-00-00 00:00:00', 0),
(109, 'Anja', 'Hambrock', 6, '0000-00-00 00:00:00', 0),
(110, 'Jörg', 'Wöpking', 6, '0000-00-00 00:00:00', 0);

--
-- Indizes der exportierten Tabellen
--

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
-- Indizes für die Tabelle `uservalidation`
--
ALTER TABLE `uservalidation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `spiele`
--
ALTER TABLE `spiele`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `tipp`
--
ALTER TABLE `tipp`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `uservalidation`
--
ALTER TABLE `uservalidation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

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
