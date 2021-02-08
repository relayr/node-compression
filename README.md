# Backend Developer Job Applicant Test - Node.js

This is a framework for building a simple client and server in Node.js.  

## Objectives

The purpose of completing this test is to show us **how you approach and solve problems**.

It should be possible to complete this test in 2-3 hours.
If you would like to invest more time into it, that's also fine :)

### Expectations

- **State your assumptions** - Anywhere you feel that the requirements are unclear please make
an assumption and document that assumption.
- **Describe Trade-offs** - When you're making a decision about using one design/approach vs. another
try to make a quick note about why you made the choice you did.
- **Provide tests** - You should provide unit tests for the code that you write. The choice of
testing tools is up to you.
- **Updates and refactoring** - Some parts of the code might be outdated or broken. Feel free to fix it.

## Requirements

This system simulates a client sending sensor readings to a remote server.
We would like you to imagine that the client and server are separated by a connection with limited bandwidth.
Please make an effort to minimize the number of bytes being sent between the client and server.
Messages don't need to be received in real-time, but try to keep latency below 2 seconds for any given message.

Please keep in mind that we are much more interested in seeing a well-designed and well-tested
solution than we are in getting the absolute best data compression.  

You are being provided with a basic framework of both the client and server.
It includes a sample implementation using HTTP POSTs.

The example works, but we think you can do better!
Modify or replace the provided implementation (don't modify the existing file-reading and event emitting logic).

### Client

The provided code will read the sensor readings from a file and provide them at random intervals
(between 0 and 1000ms). You job is to handle these messages and send them in an efficient manner
to the server. Make your changes in the `sender/transmit.js` file.

### Server

Please print the received messages to `STDOUT` as in the example.
If you have other things you want to output please use `STDERR`.

Make your changes in the `receiver/index.js` file.

## Test Script

We have provided a `bash` script for doing acceptance testing. It will run both the client and
server. It captures the output of the server, sorts it and then compares it to the input. If they
are the same the test passes. This should help to evaluate your solution.





# Changes in code.

1. Added git ignore
2. Added missing request package in package.json for the sender
3. Removed try catch in sender/index as now we dont need parsing
4. Tried gzip and brotli compression to minimize the number of bytes on the network

### Why I choose brotli compression?

I tried first using gzip as it is the old compression method that works without any dependency on the node version.

Then I tried brotli new compression method that needs node version 11 and above required, or need to install brotli package.

The data is clear after both compression Brotli offers a better compression ratio than gzip.



### DATA POINTS

| BYTES | COMPRESSION | COMMENTS |
| --- | --- | --- | --- |
| 122005 | uncompressed |  | 
| 86044 | gzip | ~29% less bytes than uncompressed | 
| 77068 | brotli | ~36% less bytes than uncompressed and ~10% better than gzip | 



*** SYSTEM REQUIREMENT USED FOR TEST ***

*OS: UBUNTU 20.04LTS*

*NODE: v14.15.4*


*** References***

>https://itnext.io/increase-node-js-server-performance-by-serving-smaller-faster-pre-compressed-brotli-gzipped-499c8da37f6c

>https://wp-rocket.me/blog/brotli-vs-gzip-compression