# SPEEDLINE

Speedline is an GUI-based event log analysis and report-writing tool for windows and sysmon logs written in electron and node.js

The aim is to provide a simple graphical interface to view, parse, annotate, format, and export reports on log files. It's supposed to speed up and streamline the timeline analysis workflow (hence the name, SpeedLine) and make it easier for analysis to perform these tasks without having to tab between multiple windows to copy/paste text and screenshots into a report. Working with a tool like this also ensures you always have the correct events at the correct timestamps, and that your notes are always on point.


This software is still in a very early build and does not yet have all the features implemented:

* Ingest logs ✓
* Display ingested logs ✓
* Filter displayed logs - in progress
* Select logs for report - in progress
* Annotate logs - in progress
* Export logs to a table format - in progress

bonus goals:

* display graphs showing relationships between different PID's and log entries
* support for formats other than .json such as .evtx .xml and plaintext
