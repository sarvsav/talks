# Welcome to Golang Dorset

Discussion on Bazel 🔥 and KO 🤛 by Sarvsav

---

## About me

Aspiring Green Developer 🌲

On the web: (I would be happy to connect)

|     Website     |   Username     |
|:------------:|:------------:|
| GitHub    |  [https://github.com/sarvsav](https://github.com/sarvsav)     |
| Medium   |  [https://sarvsav.medium.com/](https://sarvsav.medium.com/)  |
| LinkedIn |  [https://in.linkedin.com/in/sarvsav](https://in.linkedin.com/in/sarvsav)      |
| X | [https://twitter.com/sarvsav](https://twitter.com/sarvsav) |

---

## What is Bazel?

### {Fast ⚡, Correct ✅ } - Choose two

Bazel is an open source project to build and test your multi-language, multi-platform projects.

- Supports incremental builds (Doesn't build everything all the time)
- Generate artifacts based on the rules
- Only generate new artifacts, when there is a change in source file of the rule
- Remote caching and remote execution (So that not everyone has to build from scratch)

### System information

```txt
Go: go version go1.22.1 linux/amd64
Ubuntu: Ubuntu 22.04.4 LTS
VSCode: V1.88.0
Bazelisk: v1.19.0
```

`Bazelisk` is the wrapper that can help us to manage different version of bazel.

---

## Bzlmod

### Enable Bzlmod in your bazelrc

Create a file named `.bazelrc` in project root with below content

```shell
# Enable Bzlmod for every Bazel command
common --enable_bzlmod
```

---

## MODULE.bazel

### Define your dependencies

```bazel
"""Must start with doc string and define the purpose"""

module (
    name = "bazel_demo",
    repo_name = "com_github_sarvsav"
    version = "1.0.0"
)

# Bazel module dependencies
# Download from bazel registry: https://registry.bazel.build/modules/rules_go
bazel_dep(name = "rules_go", version = "0.46.0")
```

---

## Gazelle

To generate `BUILD.bazel` files

### Installation

```shell
go install github.com/bazelbuild/bazel-gazelle/cmd/gazelle@latest
```

### Generating BUILD files

```shell
gazelle -repo_root . -go_prefix github.com/sarvsav/golang_dorset_bazel
```

---

## Building project using Bazel

To build the project, simply provide the target

```shell
bazelisk build :with-bazel
```

---

## KO

`Docker` 🐳 is doing to `apt`,
    what `apt` did to `tar` 🛍️

~ Bryan Cantrill

ko makes building Go container images easy, fast, and secure by default.

- ko uses chainguard image, not the scratch image.
- ko gives you SBOM (Software Bill of Materials) out of the box.
- ko is good fit for CI/CD purpose.

---

## Old school way

```Dockerfile
# Use the official Golang image as base
FROM golang:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the local package files to the container's workspace
COPY . .

# Build the Go application
RUN go build -o main .

# Command to run the executable
CMD ["./main"]
```

### Common issues with above image

1. Base image vulnerabilities, and needs to be updated regularly
2. No multi stage build hence the image size is huge
3. Access via root user
4. No explicit COPY path
5. No security scanning

---

## Instructions

- Create a go project to print greet message.
- Build the container using `ko`

---

## Demo

### Installation

```shell
go install github.com/google/ko@latest
```

### Setup

```shell
go mod init github.com/sarvsav/golang_dorset
```

---

## Write go code

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello Golang Dorset!")
}
```

## Building image

```shell
export KO_DOCKER_REPO=ko.local # To use localhost as a container registry
export DOCKER_HOST="unix://${HOME}/.docker/desktop/docker.sock" # To locate docker socket
ko build . # Building the image
```

---

## Green development

### How it helps in green development 🌲?

- Smaller container images
- Built using go

### What scratch is missing? A complete empty image

- /tmp directory
- tls certificates and need to install
- maybe some user creation?

### How these distroless images build?

- Using bazel
- generate a tarball
- load them to your docker

---

## QnA ❔

---

## Thank you ❤️

### Credits

1. https://bazel.build/
2. https://github.com/bazelbuild/bazel-gazelle
3. https://ko.build/
4. https://www.youtube.com/watch?v=nZLz0o4duRs
5. https://github.com/bazelbuild/bazelisk