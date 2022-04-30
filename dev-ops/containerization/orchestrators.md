### Containerization

Bundling of different applications as a way to more effectively develop, manage and deploy them across various infrastructures. Enables companies to be more agile and scalable.

### Kubernetes

Open-source container-as-a-service (CaaS) framework that enables developers to leverage capabilities including self-monitoring, process automation, container balancing, and storage orchestration. An open-source container orchestration software solution that provides ability to run containers on various machines, auto-scale containers, distribute load between containers, manage storage required by containers and etc. Auto-scaling, load balancing and storage management features offered are complementary to Docker.

### OpenShift

Enterprise open source container orchestration platform offered by Redhat powered by Kubernetes and includes Docker to manage the variety of workloads. Takes Kubernetes further and enables more simplicity in the management of workloads along with different types of tools. Provides commercial support, handles patches and increases security.

Cloud-based Kubernetes container platform that is considered both a containerization software and platform-as-a-service (PaaS) i.e. software product that includes components of Kubernetes container management project, but adds productivity and security features. Supports containerized infrastructure where Docker is used to create lightweight Linux-based containers and Kubernetes supports the task of orchestrating and managing containers on multiple hosts.

Offers consistent security, built-in monitoring, centralized policy management, and compatibility with Kubernetes container workloads. Allows developers to create, test and deploy applications on the cloud. Supports Go, NodeJS, Ruby, Python, PHP, Perl and Java. Allows both Dev and Ops to work together without having to sacrifice their individual concerns i.e. developers create and deploy applications on demand in languages they prefer, while devops have to maintain them at appropriate scale.

### OpenShift vs Kubernetes

- Both manage groups of containers called clusters that contains a control plane and worker nodes.
- Both feature robust and scalable architecture that enables rapid and large-scale application development, deployment and management, and also running on Apache license.
- Kubernetes offers more flexibility and can be installed on any platform including Azure and AWS.
- OpenShift has stricter security policies i.e. forbidden to run container as root.
- Kubernetes has larger community of developers while OpenShift is limited primarily to Red Hat Developers.
- Kubernetes lack networking solution while OpenShift offers Open vSwitch which comes in three native plug-ins.

### Kubernetes vs Swarm

Advatanges of Swarm:

- Easier to deploy/manage.
- Comes with Docker and follows 80/20 rule.
- Runs anywhere Docker does including local, cloud, datacenter, ARM, Windows, 32-bit, 64-bit etc.
- Secure by default.

Advantages of Kubernetes:

- Have more features and flexibility.
- Cloud vendors will deploy/manage Kubernetes.
- Checkbox for CIO/CTO.

### Similarities

Both manage groups of containers called clusters which has a control plane and worker nodes. Containers run in worker nodes, each of which has its own Linux OS.
