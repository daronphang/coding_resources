## Random Access Memory (RAM)

RAM is the hardware in a computing device where the OS, application programs and data in current use are kept so they can be quickly reached by the device's processor. RAM is the main memory in a computer, and is much faster to read/write to other kinds of storage i.e. HDD, SDD, optical drive. One of the most important components in determining system's performance. Random access means any storage location (memory address) can be accessed directly.

RAM is volatile i.e. data retained in RAM is lost when computer is turned off. When computer is rebooted, OS and other files are reloaded into RAM. Hence, it cannot be used to store permanent data.

RAM allows your computer to perform many of its active everyday tasks i.e. loading applications, browsing the internet, editing a spreadsheet, etc. Memory allows you to switch quickly among these tasks. When the application si closed, the OS takes it out of RAM and clears the space.

One extended use of RAM is to help previously-accessed information be available much more quickly by caching. When computer is turned on and an application is launched, it may take a while to load as it is copied from hard disk to RAM. However, if it's relaunched, it opens almost instantly as it is loaded out from cache in the RAM and not from the hard disk.

Access time in RAM is independent of its address i.e. each storage location inside the memory is as easy to reach as other locations and take the same amount of time.

## Cache vs RAM

Cache refers to any temporary collection of data, either in hardware or software. Memory caching works by first setting aside a portion of RAM to be used as cache. When computer needs to access data quickly, but can't find it in the cache, it will look for it with the RAM. Cache is 100 times faster than standard RAM. Nonetheless, caching is expensive and limited in size.

## Types of RAM

### Dynamic RAM (DRAM)

Must be continually refreshed in order to maintain the data. This is done by placing the memory on a refresh circuit that rewrites the data several hundred times per second. DRAMs are made up of memory cells, which are composed of one capacitor and one transitor. DRAM is at least ten times slower than SRAM but less expensive and hence, is used for most system memory as it is cheap.

### Static RAM (SRAM)

Memory retains its contents as long as power is being supplied. Uses a matrix of 6-transitors and no capacitors. Transistors do not require power to prevent leakage, hence SRAM need not be refreshed on a regular basis. Uses more chips than DRAM for the same amount of storage space, and expensive to read/write. Used as cache memory and has very fast access.

### NAND

NAND flash is non-volatile and is used for permanent storage in mobile devices. Data is retained after the power is turned off for data storage. SSDs using NAND flash have largely replaced hard drives in personal computers and servers due to their significantly faster access speed.

NAND is a smaller chip than NOR, can achieve higher density and is less costly to manufacture. Hence, NAND flash has become the mainstay for high-capacity storage-class memory and is used in memory cards, USB drives, SSDs and mobile devices. Neither NAND nor NOR is as fast as DRAM (100x faster and lasts 1000x longer), nor are they bit-addressable or bit-alterable, so they do not provide the performance generally required for main memory.

## Memory Leak

Memory leak occurs when programmers create a memory in heap but forget to delete it. Consequences is that it reduces the performance of the computer by reducing the amount of available memory. In worst case, too much of available memory gets allocated and system fails to work.
