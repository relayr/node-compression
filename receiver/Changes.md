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