-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 12, 2021 at 06:00 PM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ambermac_quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `ansid` int(11) NOT NULL,
  `qid` int(11) NOT NULL,
  `ansdesc` varchar(255) NOT NULL,
  `correct` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`ansid`, `qid`, `ansdesc`, `correct`) VALUES
(1, 1, 'An Elephant', 1),
(2, 1, 'A mantis', 0),
(3, 1, 'A tiger', 0),
(4, 1, 'A car', 0);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `qid` int(11) NOT NULL,
  `qdesc` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`qid`, `qdesc`) VALUES
(1, 'What is the biggest thing listed?');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`ansid`),
  ADD KEY `qid` (`qid`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`qid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `ansid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `qid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
