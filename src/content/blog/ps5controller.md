---
title: "Connecting a PS5 Controller with RaspberryPi via Bluetooth"
description: "Detailed Process to read PS5 Controller input with python connected with bluetooth"
pubDate: "Dec 05 2023"
heroImage: "/ps5_controller.webp"
tags: ["raspberry-pi"]
---

# Connecting a PS5 Controller with RaspberryPi via Bluetooth

Setting up a PS5 controller on a Raspberry Pi is surprisingly quite simple and easy to control.

This guide will teach you how to connect a PS5 controller to a Raspberry Pi via bluetooth and install [pydualsense](https://github.com/flok/pydualsense.git) to read the controller inputs in python which supports gyroscopes and touchpad input as well.

## Things you will need

- Raspberry Pi 4 or higher with SSH setup
- PS5 Dual sense controller

**Note:** Raspberry Pi 3 could work but i haven’t tested it

## Connecting the Dual Sense Controller

Turn on your Raspberry Pi and SSH into it

```
sudo apt updatesudo apt upgradesudo apt install joystick
```

Press and hold the **_PS button and Share button_** at the same time until the light bar begins to flash, this should put the controller in pairing mode

Connect the controller to bluetooth via the GUI. Alternatively, you can also use `bluetoothctl` if you face issues.

Open the Bluetooth settings on your raspberry pi and connect with **_Dual Sense Wireless Controller_** and Pair with it

Verify that the controller is registered as a input device with `ls /dev/input`

You should see `4 events(event0, event1, event2, event3)`and `2 js(js0, js1)` inputs as your options

![](https://miro.medium.com/v2/resize:fit:700/1*IOstki3WAKln_V9QbR41Qw.png)

## Install pydualsense

You can now start the installation for [pydualsense](https://github.com/flok/pydualsense.git) and start reading the inputs from the controller. You can also refer to [pydualsense-documentation](https://flok.github.io/pydualsense/index.html) for additional details

```
sudo apt install wgetmkdir ps5_controllercd ps5_controllerwget https://github.com/flok/pydualsense/blob/master/70-ps5-controller.rules
```

Add a _udev_ rule to allow user to access controller without requiring root access

```
sudo cp 70-ps5-controller.rules /etc/udev/rules.dsudo udevadm control --reload-rulessudo udevadm trigger
```

Install pydualsense

```
sudo apt install libhidapi-devpip3 install pydualsense
```

Create a new python file called `controller_test.py`

```
from pydualsense import *def cross_down(state):    dualsense.light.setColorI(255,0,0)     print(f'cross {state}')def circle_down(state):    dualsense.light.setColorI(0,255,0)     print(f'circle {state}')def dpad_down(state):    dualsense.light.setColorI(0,0,255)     print(f'dpad {state}')def l2_down(state):    print(f'l2 {state}')def joystick(stateX, stateY):    print(f'lj {stateX} {stateY}')dualsense = pydualsense()dualsense.init()dualsense.cross_pressed += cross_downdualsense.circle_pressed += circle_downdualsense.dpad_down += dpad_downdualsense.left_joystick_changed += joystickdualsense.l2_changed += l2_downwhile not dualsense.state.R1:    ...dualsense.close()
```

Run the python file and test different inputs and verify their output

- Circle press (True, False)
- Cross press (True, False)
- DPad down press (True, False)
- L2 Trigger press (value)
- R1 Trigger press (Shutdown the program)

![](https://miro.medium.com/v2/resize:fit:700/1*tbEAJV-WRhtr7rWcYRl5pA.png)

_Congratulations_, you have successfully connected a DualSense controller with RaspberryPi and Python!

Refer to [pydualsense-documentation](https://flok.github.io/pydualsense/index.html) for additional functionality such as Adaptive Triggers, TouchPad, Microphone and Gyroscope controls.

Credits to the developers of [pydualsense](https://github.com/flok/pydualsense.git) for making this amazing interface possible.
