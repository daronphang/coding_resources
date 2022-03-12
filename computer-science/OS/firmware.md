### Boot Procedure

1. Power is switched on.
2. CPU starts up and loads instructions from firmware chip on the motherboard.
3. Firmware code does Power On Self Test (POST) which initializes the remaining hardware, detects the connected peripherals, and checks if all connected devices are healthy.
4. Firmware code cycles through all storage devices and looks for a boot-loader (usually located in first sector of disk); if found, firmware hands over control to CPU.
5. Boot loader loads OS and kernel into memory.
6. GUI is loaded and presented with login screen.

### OS vs Kernel

OS is the system program that manages the resources of the system, and the kernel is the important program in the OS. Kernel acts as interface between software and hardware. OS acts as an interface between user and computer.

### System Firmware

Firmware is a low-level software embedded into electronic devices to operate the device, or bootstrap another program to do it. Exists in computers and peripherals. In computers, firmware provides a standard interface for complex software like an OS to boot up and work with hardware components i.e. works as an interpreter between OS and computer's firmware. Uses data structures to boot up OS on a partition. Firmware resides on non-volatile memory i.e. flash ROM attached to motherboard. Hardware manufacturers make firmware based on two specifications:

- Basic Input/Output (BIOS)
- Unified Extensible Firmware Interface (UEFI)

Mission of firmware is to boot up computer, run OS, verify health of hardware components and memory, and pass it the control of the whole system.

### BIOS

Firmware embedded on the chip of the motherboard and is pre-installed. Has only 1MB of space to execute in. Works by reading the first sector of hard drive which has the next device's address to initialize or code to execute.

Stored on an Erasable Programmable Read-Only Memory (EPROM), allowing manufacturers to push out updates easily. BIOS looks for MBR that is stored on the boot device and uses it to launch the bootloader.

### UEFI

Stores all data about initialization and startup in an .efi file, instead of storing it on the firmware. The .efi file is stored on a special partition called EFI System Partition (ESP) on the hard disk. ESP partition also contains the bootloader. Makes use of GPT which performs cyclic redundancy checks to identify any corruption issue. Capable of supporting more than four primary partitions. UEFI bypasses the BIOS POST so that the OS can boot directly.

Designed to overcome many limitations of BIOS:

- Supports bootable drive sizes more than 9 zettabytes, whereas BIOS can only boot from drives smaller than 2.2 terabytes.
- Uses GPT to save information about hard drive data while BIOS uses MBR.
- Supports unlimited partitions while BIOS limits phyiscal partitions to four.
- Provides faster boot time.
- Has discrete driver support while BIOs has drive support stored in its ROM.
- Offers security like "Secure Boot".
- Runs in 32/64bit mode whereas BIOS runs in 16bit mode (UEFI provides GUI for navigation).

UEFI is not supported by all computers and devices. To use it, the hardware on disk must support UEFI. Moreover, system disk needs to be a GPT disk. To convert MBR disk to GPT, can use third-party disk management tool.

```console
$ diskpart
$ list disk
```

### System Firmware

#### UEFI

Stores all startup and initialization information in a .efi file rather then a firmware file. File is located on a special partition of the hardrive called EFI system partition.

#### BIOS

Stores bootloader data in MBR. MBR is located in the first sector of the disk.
