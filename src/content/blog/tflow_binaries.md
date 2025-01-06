---
title: "How to install CPU binaries and Models for Tensorflow on Mac OS"
description: "Detailed guide to installing Tensorflow and its binaries in MacOS"
pubDate: "Feb 12 2018"
heroImage: "/tflow.webp"
---

# Installing Tensorflow

The story of installing tensorflow on MacOS boils down to two things.

Are you using Tensorflow for the first time?

If you are, you might just want to do a pip3 install tensorflow

But this will install only the source without the binaries and you will be stuck with a slow running version of Tensorflow and may get a warning like

```
[W tensorflow/core/platform/cpu_feature_guard.cc:45] The tensorflow library wasnt compiled to use SSE4.1, SSE4.2, AVX, AVX2, FMA instructions, but these are available on your machine and could speed up CPU computations
```

This is basically a warning that says, your computer is capable of running tensorflow faster but isnt able to do so since it hasnt been compiled to use the above mentioned instructions that your CPU supports

Alternatively you could install the GPU version of Tensorflow which works much faster but only works on Nvidia GPUs currently using CUDA. But installing that is a challenge for another day.

So how do you install the tensorflow source with binaries?

Go ahead and open up a terminal window and clone this repo in your home directory

```
git clone https://github.com/tensorflow/tensorflow.git
```

Go ahead and configure your tensorflow installation based on what you will use it with and it will install the following dependancies using their provided paths

```
./configurePlease specify the location of python. [Default is /usr/bin/python]: /usr/bin/python2.7Found possible Python library paths:  /usr/local/lib/python2.7/dist-packages  /usr/lib/python2.7/dist-packagesPlease input the desired Python library path to use.  Default is [/usr/lib/python2.7/dist-packages]Using python library path: /usr/local/lib/python2.7/dist-packagesDo you wish to build TensorFlow with MKL support? [y/N]No MKL support will be enabled for TensorFlowPlease specify optimization flags to use during compilation when bazel option "--config=opt" is specified [Default is -march=native]:Do you wish to use jemalloc as the malloc implementation? [Y/n]jemalloc enabledDo you wish to build TensorFlow with Google Cloud Platform support? [y/N]No Google Cloud Platform support will be enabled for TensorFlowDo you wish to build TensorFlow with Hadoop File System support? [y/N]No Hadoop File System support will be enabled for TensorFlowDo you wish to build TensorFlow with the XLA just-in-time compiler (experimental)? [y/N]No XLA support will be enabled for TensorFlowDo you wish to build TensorFlow with VERBS support? [y/N]No VERBS support will be enabled for TensorFlowDo you wish to build TensorFlow with OpenCL support? [y/N]No OpenCL support will be enabled for TensorFlowDo you wish to build TensorFlow with CUDA support? [y/N] YCUDA support will be enabled for TensorFlowDo you want to use clang as CUDA compiler? [y/N]nvcc will be used as CUDA compilerPlease specify the Cuda SDK version you want to use, e.g. 7.0. [Leave empty to default to CUDA 8.0]: 8.0Please specify the location where CUDA 8.0 toolkit is installed. Refer to README.md for more details. [Default is /usr/local/cuda]:Please specify which gcc should be used by nvcc as the host compiler. [Default is /usr/bin/gcc]:Please specify the cuDNN version you want to use. [Leave empty to default to cuDNN 6.0]: 6Please specify the location where cuDNN 6 library is installed. Refer to README.md for more details. [Default is /usr/local/cuda]:Please specify a list of comma-separated Cuda compute capabilities you want to build with.You can find the compute capability of your device at: https://developer.nvidia.com/cuda-gpus.Please note that each additional compute capability significantly increases your build time and binary size.[Default is: "3.5,5.2"]: 3.0Do you wish to build TensorFlow with MPI support? [y/N] MPI support will not be enabled for TensorFlowConfiguration finished
```

Once you’re done configuring tensorflow you need to build these packages using the instructions that your CPU can support using bazel

```
bazel build -c opt --copt=-mavx --copt=-mavx2 --copt=-mfma --copt=-msse4.2 -k //tensorflow/tools/pip_package:build_pip_package
```

This will compile Tensorflow on your machine according to the instructions. This might take a little while so sit back and relax. After its done create a wheel to install the package

```
bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkgsudo pip3 install /tmp/tensorflow_pkg/tensorflow-any.whl
```

Go ahead and test the installation using python console.

```
>>> import tensorflow as tf>>> hello = tf.constant('Hello, TensorFlow!')>>> sess = tf.Session()>>> print(sess.run(hello))
```

If no warnings or error show up, you’re good to go!

## Installing Tensorflow Models

Tensorflow models allows you to use Google’s API for all the other neat stuff tensorflow can do. For example: Object detection

Before installing models you need to install some python dependancies

```
pip3 install pillowpip3 install lxmlpip3 install jupyterpip3 install matplotlibpip3 install protobuf
```

To get TF models go to any directory other the main TF directory and clone the following repository

```
git clone https://github.com/tensorflow/models
```

to install protoc go to this [link](https://github.com/google/protobuf/releases) and download the required protobuf release or just download [**_protoc-3.5.1-osx-x86_64.zip_**](https://github.com/google/protobuf/releases/download/v3.5.1/protoc-3.5.1-osx-x86_64.zip)

unzip this file in the directory where your models folder is located and then go to models/research and install protoc

```
cd models/research../../bin/protoc object_detection/protos/*.proto --python_out=.
```

Now you just need to install the models.

```
# inside models/research runpython3 setup.py buildpython3 setup.py install# inside models/research/slim runsudo pip3 install -e .
```

If you come across a problem like “google not found” or “nets not found”. Go ahead and add the paths to for include/google/protobuf (generally outside models directory in include/)and

```
# inside tensorflow directory where models is locatedexport PYTHONPATH=$PYTHONPATH:\`pwd\`:\`pwd\`/models/research/slimexport PYTHONPATH=$PYTHONPATH:\`pwd\`:\`pwd\`/include/google
```

To check if it is working go to

```
cd tensorflow/models/research/object_detectionpython3 object_detection_tutorial.py
```

Or simply open it as a jupyter notebook and run the .ipynb file.

_Thank you!_

I am a Computer Science major who is really interested in exploring the new world of Machine learning. I am going to continue uploading new tutorials on Medium about some other Deep learning stuff. Stay tuned and follow.
