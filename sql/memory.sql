-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Nov 2023 um 12:01
-- Server-Version: 10.4.28-MariaDB
-- PHP-Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `memory`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `karten`
--

CREATE TABLE `karten` (
  `ID` int(255) NOT NULL,
  `Frage` varchar(255) NOT NULL,
  `Antwort` varchar(255) NOT NULL,
  `Set_ID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `karten`
--

INSERT INTO `karten` (`ID`, `Frage`, `Antwort`, `Set_ID`) VALUES
(1, 'Polypol', '1. Viele Unternehmen konkurrieren miteinander.\r\n2. Es gibt keine klare Dominanz eines Unternehmens.\r\n3. Neue Unternehmen können leicht in den Markt eintreten und alte können aussteigen.', 1),
(2, 'Oligopol', '1. Einige große Unternehmen dominieren den Markt.\r\n2. Diese Unternehmen beeinflussen sich gegenseitig.\r\n3. Neue Unternehmen haben Schwierigkeiten, in den Markt einzutreten.', 1),
(3, 'Monopol', '1. Ein einzelnes Unternehmen kontrolliert den gesamten Markt.\r\n2. Es gibt keine echte Konkurrenz.\r\n3. Das Unternehmen kann die Preise festlegen, da es keine Alternativen gibt.', 1),
(4, 'Angebotsmonopol', '1. Es gibt nur eine Firma, die dieses spezielle Ding verkauft. Keine anderen Unternehmen bieten dasselbe an.\r\n2. Es gibt keine anderen Optionen oder Ersatzprodukte von anderen Verkäufern.', 1),
(5, 'Angebotsoligopol', '1. Begrenzte Anzahl von Unternehmen, die das betreffende Produkt herstellen oder Dienstleistung anbieten.\r\n2. Unternehmen haben einen erheblichen Einfluss auf den Mark.\r\n3. Die Handlungen eines Anbieters können die Strategien der anderen beeinflussen.', 1),
(6, 'AIDA Formel', '1. Attention (Aufmerksamkeit).\r\n2. Interest (Interesse).\r\n3. Desire (Verlangen).\r\n4. Action (Aktion).', 1),
(7, 'ERP (Enterprise Resource Planning)', '1. Integriert Geschäftsprozesse\r\n2. Automatisiert und optimiert Unternehmensressourcen', 1),
(8, 'CRM (Customer Relationship Management', '1. Verwaltet Kundeninteraktionen\r\n2. Speichert Kundeninformationen', 1),
(9, 'BI (Business Intelligence)', '1. Sammelt, integriert und analysiert geschäftliche Informationen\r\n2. Erstellt Berichte, Dashboards und Datenvisualisierungen', 1),
(10, 'Agiles Projektmanagement', 'Scrum', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sets`
--

CREATE TABLE `sets` (
  `ID` int(100) NOT NULL,
  `Name_Set` varchar(100) NOT NULL,
  `LernThema` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `sets`
--

INSERT INTO `sets` (`ID`, `Name_Set`, `LernThema`) VALUES
(1, 'WiSo_Set', 'WiSo');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `spiele`
--

CREATE TABLE `spiele` (
  `ID` int(11) NOT NULL,
  `SetID` int(11) NOT NULL,
  `Memory` tinyint(1) NOT NULL DEFAULT 0,
  `Karteikarten` tinyint(1) NOT NULL DEFAULT 0,
  `Quiz` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `spiele`
--

INSERT INTO `spiele` (`ID`, `SetID`, `Memory`, `Karteikarten`, `Quiz`) VALUES
(1, 1, 1, 1, 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `karten`
--
ALTER TABLE `karten`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Set_ID` (`Set_ID`);

--
-- Indizes für die Tabelle `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `spiele`
--
ALTER TABLE `spiele`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `2Beziehung` (`SetID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `karten`
--
ALTER TABLE `karten`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `sets`
--
ALTER TABLE `sets`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `spiele`
--
ALTER TABLE `spiele`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `karten`
--
ALTER TABLE `karten`
  ADD CONSTRAINT `Set_ID` FOREIGN KEY (`Set_ID`) REFERENCES `sets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `spiele`
--
ALTER TABLE `spiele`
  ADD CONSTRAINT `2Beziehung` FOREIGN KEY (`SetID`) REFERENCES `sets` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
