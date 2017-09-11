-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2017 at 11:05 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notesapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow_system`
--

CREATE TABLE `follow_system` (
  `follow_id` int(11) NOT NULL,
  `follow_by` int(11) NOT NULL,
  `follow_by_username` varchar(32) NOT NULL,
  `follow_to` int(11) NOT NULL,
  `follow_to_username` varchar(32) NOT NULL,
  `follow_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_system`
--

INSERT INTO `follow_system` (`follow_id`, `follow_by`, `follow_by_username`, `follow_to`, `follow_to_username`, `follow_time`) VALUES
(81, 5, 'takkar', 6, 'faiyaz', '1497267362133'),
(85, 8, 'coldplay', 7, 'ghalib', '1497279746775'),
(86, 8, 'coldplay', 6, 'faiyaz', '1497279747882'),
(87, 8, 'coldplay', 5, 'takkar', '1497279762184'),
(95, 5, 'takkar', 8, 'coldplay', '1497355236887'),
(96, 7, 'ghalib', 5, 'takkar', '1497358070303'),
(98, 6, 'faiyaz', 8, 'coldplay', '1497369276324'),
(100, 6, 'faiyaz', 5, 'takkar', '1497369290821'),
(101, 7, 'ghalib', 8, 'coldplay', '1497460672631'),
(103, 7, 'ghalib', 6, 'faiyaz', '1497461741715'),
(104, 6, 'faiyaz', 7, 'ghalib', '1497614091324'),
(106, 5, 'takkar', 7, 'ghalib', '1499716311531');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `like_by` int(11) NOT NULL,
  `like_by_username` varchar(32) NOT NULL,
  `note_id` int(11) NOT NULL,
  `like_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `like_by`, `like_by_username`, `note_id`, `like_time`) VALUES
(30, 7, 'ghalib', 74, '1497613899085'),
(31, 7, 'ghalib', 61, '1497613909800'),
(32, 6, 'faiyaz', 76, '1497613932622'),
(33, 6, 'faiyaz', 70, '1497614006858'),
(35, 6, 'faiyaz', 74, '1497614088181'),
(39, 5, 'takkar', 61, '1499168933883'),
(43, 5, 'takkar', 80, '1499176614336'),
(44, 5, 'takkar', 76, '1499352487259');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `note_time` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `user`, `username`, `title`, `content`, `note_time`) VALUES
(61, 6, 'faiyaz', 'Untitled note', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '1497022376821'),
(70, 6, 'faiyaz', 'Miracle', 'For you!! and me', '1497043496669'),
(73, 8, 'coldplay', 'coldplay', '.....', '1497279792645'),
(74, 8, 'coldplay', 'k', 'k', '1497279939388'),
(75, 7, 'ghalib', 'Note...', '???????', '1497357617034'),
(76, 7, 'ghalib', 'Jkjkj', 'Kkj', '1497541687310'),
(80, 5, 'takkar', 'Note.', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for ''lorem ipsum'' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', '1499168254855'),
(86, 5, 'takkar', 'jjkjk', 'jk', '1499703894881');

-- --------------------------------------------------------

--
-- Table structure for table `profile_views`
--

CREATE TABLE `profile_views` (
  `view_id` int(11) NOT NULL,
  `view_by` int(11) NOT NULL,
  `view_by_username` varchar(32) NOT NULL,
  `view_to` int(11) NOT NULL,
  `view_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_views`
--

INSERT INTO `profile_views` (`view_id`, `view_by`, `view_by_username`, `view_to`, `view_time`) VALUES
(54, 7, 'ghalib', 5, '1497132247092'),
(55, 7, 'ghalib', 5, '1497132609194'),
(56, 7, 'ghalib', 5, '1497133061667'),
(57, 5, 'takkar', 7, '1497134568843'),
(58, 5, 'takkar', 7, '1497134615082'),
(59, 5, 'takkar', 7, '1497134648718'),
(60, 5, 'takkar', 7, '1497134744326'),
(61, 5, 'takkar', 7, '1497134762754'),
(62, 5, 'takkar', 7, '1497134855650'),
(63, 5, 'takkar', 7, '1497134935923'),
(64, 5, 'takkar', 7, '1497134956258'),
(65, 5, 'takkar', 7, '1497134959458'),
(66, 5, 'takkar', 7, '1497135032763'),
(67, 5, 'takkar', 7, '1497135079271'),
(68, 5, 'takkar', 7, '1497135357939'),
(69, 5, 'takkar', 7, '1497135535734'),
(70, 5, 'takkar', 7, '1497135654692'),
(71, 5, 'takkar', 7, '1497209272427'),
(72, 5, 'takkar', 7, '1497209296972'),
(73, 5, 'takkar', 7, '1497209468370'),
(74, 5, 'takkar', 7, '1497209604524'),
(75, 5, 'takkar', 7, '1497209619636'),
(76, 5, 'takkar', 7, '1497209826248'),
(77, 5, 'takkar', 7, '1497209944057'),
(78, 5, 'takkar', 7, '1497210029617'),
(79, 5, 'takkar', 7, '1497210057820'),
(80, 5, 'takkar', 7, '1497210117676'),
(81, 5, 'takkar', 7, '1497210683522'),
(82, 5, 'takkar', 7, '1497211005475'),
(83, 5, 'takkar', 6, '1497262251701'),
(84, 5, 'takkar', 7, '1497262256436'),
(85, 6, 'faiyaz', 5, '1497262326796'),
(86, 6, 'faiyaz', 5, '1497262406030'),
(87, 6, 'faiyaz', 5, '1497262450184'),
(88, 6, 'faiyaz', 5, '1497263117172'),
(89, 6, 'faiyaz', 5, '1497263165528'),
(90, 6, 'faiyaz', 5, '1497263270482'),
(91, 6, 'faiyaz', 5, '1497263290783'),
(92, 6, 'faiyaz', 7, '1497263308673'),
(93, 6, 'faiyaz', 7, '1497263479933'),
(94, 6, 'faiyaz', 7, '1497263496585'),
(95, 6, 'faiyaz', 7, '1497263566409'),
(96, 6, 'faiyaz', 7, '1497263614921'),
(97, 6, 'faiyaz', 5, '1497264799191'),
(98, 6, 'faiyaz', 5, '1497264860541'),
(99, 6, 'faiyaz', 5, '1497264971754'),
(100, 6, 'faiyaz', 7, '1497265001633'),
(101, 5, 'takkar', 7, '1497266568488'),
(102, 5, 'takkar', 7, '1497266626763'),
(103, 5, 'takkar', 6, '1497266639672'),
(104, 6, 'faiyaz', 5, '1497279556155'),
(105, 8, 'coldplay', 5, '1497279742388'),
(106, 8, 'coldplay', 5, '1497279759600'),
(107, 8, 'coldplay', 6, '1497279765852'),
(108, 8, 'coldplay', 7, '1497279769035'),
(109, 7, 'ghalib', 5, '1497280210835'),
(110, 7, 'ghalib', 6, '1497280214797'),
(111, 7, 'ghalib', 6, '1497280717660'),
(112, 7, 'ghalib', 5, '1497461511090'),
(113, 7, 'ghalib', 5, '1497461604434'),
(114, 7, 'ghalib', 5, '1497461636743'),
(115, 7, 'ghalib', 5, '1497461673196'),
(116, 7, 'ghalib', 5, '1497461721072'),
(117, 7, 'ghalib', 5, '1497461813002'),
(118, 7, 'ghalib', 8, '1497461821770'),
(119, 7, 'ghalib', 8, '1497461965900'),
(120, 7, 'ghalib', 8, '1497461986236'),
(121, 7, 'ghalib', 8, '1497462113440'),
(122, 7, 'ghalib', 8, '1497462143823'),
(123, 5, 'takkar', 7, '1499716299083'),
(124, 5, 'takkar', 6, '1499976560514'),
(125, 5, 'takkar', 6, '1499976668304');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `bio` varchar(500) NOT NULL,
  `email_verified` enum('yes','no') NOT NULL DEFAULT 'no',
  `joined` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `bio`, `email_verified`, `joined`) VALUES
(5, 'takkar', 'takkar@gmail.com', '$2a$10$sdy1uFQqpBtk8QbAQ61YqehQ73gksod9G8XbA3fqv7lcPEkffgDla', 'Developer of Instagram.', 'yes', '1497128558168'),
(6, 'faiyaz', 'faiyaz@gmail.com', '$2a$10$HK.w9QLoBkkp2Tfx12FxKuaJWj2BkBPCR17xZKfk3sJFIVWfj7hma', 'Hello world!!', 'yes', '1497128554668'),
(7, 'ghalib', 'ghalib@gmail.com', '$2a$10$S22pBWFlb1t1ZZnNr1pAFOVYBmbo7t.dNdD9JfB0sPsec87sEVsi.', '', 'yes', '1497128558668'),
(8, 'coldplay', 'coldplay@gmail.com', '$2a$10$vSjEiBgSckcyBjZCV1AdV.x7e4n5jMte3wBlUWAH1GIEtVMfWlGdW', '', 'yes', '1497279682801');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow_system`
--
ALTER TABLE `follow_system`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `profile_views`
--
ALTER TABLE `profile_views`
  ADD PRIMARY KEY (`view_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follow_system`
--
ALTER TABLE `follow_system`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
--
-- AUTO_INCREMENT for table `profile_views`
--
ALTER TABLE `profile_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
