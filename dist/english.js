const englishFacts = `
shared|Shared responsibility|A team needs to identify who patches its application on a virtual machine.|Separates provider controls from customer obligations.
elastic|Elasticity|A store must add capacity during promotions and remove it afterward.|Adjusts resources as demand changes.
capex|Operating expenditure|A company wants to pay as it goes without buying servers upfront.|Shifts some upfront investment to operating expenses.
region|Region|Legal requires regional resources to stay within an approved geography.|Defines a geographic area for regional resources.
az|Availability Zone|An application must survive a data center failure within a region.|Isolates physical failures within a region.
iaas|IaaS|The team needs administrative access to the guest operating system.|Provides virtual infrastructure with control of the guest OS.
paas|PaaS|A team wants to deploy web code and delegate platform maintenance.|Provides a managed application runtime.
saas|SaaS|The company wants ready-to-use email as a subscription.|Delivers a complete application managed by the provider.
inventory|Use case inventory|A committee needs to know which agents are deployed, who owns them, and what data they use.|Records systems, owners, data, and deployment status.
human|Human approval|An agent proposes high-value refunds that must be validated before issuance.|Requires a person to validate a sensitive action before execution.
baseline|Baseline|A team wants to compare resolution times before and after introducing AI.|Establishes a reference point for measuring impact.
impact|Impact assessment|Before automating lending decisions, a team must examine potential effects on applicants.|Analyzes consequences and risks for affected parties.
retention|Retention policy|Test records must be deleted when their authorized storage period ends.|Specifies how long data is kept and when it is deleted.
pilot|Controlled pilot|A team wants to measure quality and cost with a small group before broad adoption.|Limits initial scope to measure outcomes and fix issues.
rag|Retrieval-augmented generation|An assistant must consult up-to-date manuals before answering.|Retrieves relevant content and adds it to the generation context.
classify|Supervised classification|A model must learn to categorize tickets from labeled examples.|Learns to assign classes from examples with known labels.
regression|Regression|A model must estimate the price of a house as a continuous number.|Estimates continuous numerical values.
cluster|Clustering|A team wants to find customer segments without labels.|Groups observations by similarity without predefined classes.
detection|Object detection|A system must locate several vehicles in an image using bounding boxes.|Identifies objects and their positions in an image.
embed|Embeddings|A search system needs vector representations to compare sentences by meaning.|Represents data in a vector space suitable for similarity comparisons.
rerank|Reranking|A search engine finds relevant candidates, but they tend to appear at the bottom.|Rescores candidates according to relevance to the query.
recall|Recall|A team wants to know what fraction of all actual fraud its model detected.|Measures the proportion of actual positives detected.
precision|Positive-class precision|A team wants to know what fraction of its fraud alerts were actual fraud.|Measures the proportion of predicted positives that are correct.
grounded|Groundedness|A team wants to detect claims unsupported by the documents retrieved by an assistant.|Measures whether claims are supported by retrieved sources.
drift|Data drift|The distribution of production inputs has changed since training.|Describes changes in input distributions over time.
leak|Data leakage|A training feature contains information available only after the prediction is made.|Explains overly optimistic evaluation caused by inappropriate information.
rto|RTO|The business wants to specify the maximum acceptable time to restore service.|Defines the recovery time objective.
rpo|RPO|The business wants to specify how many minutes of data it could lose in an outage.|Defines the recovery point objective.
canary|Canary deployment|A new version should initially receive only a small fraction of live traffic.|Limits initial exposure to measure a change under real traffic.
synthetic|Synthetic monitoring|A team needs to check a checkout flow regularly even when no visitors are online.|Runs artificial transactions to measure availability and latency.
trace|Distributed tracing|A request crosses five services and the team needs to find which one added latency.|Correlates operations belonging to one request across services.
runbook|Runbook|Operators need tested steps to restore a service.|Documents a repeatable procedure for incidents or maintenance.
idem|Idempotency|Retrying a payment request must result in just one effective charge.|Allows operations to be repeated without duplicating their intended effect.
jitter|Exponential backoff with jitter|Thousands of clients retry at once after receiving throttling responses.|Spaces out and randomizes retries to reduce synchronized spikes.
dlq|Dead-letter queue|A team needs to review messages that exhausted their processing attempts.|Isolates failed messages for diagnosis and reprocessing.
event|Publish and subscribe|A customer signup must notify billing, support, and analytics independently.|Distributes events from a producer to multiple independent subscribers.
circuit|Circuit breaker|A repeatedly failing dependency should stop receiving calls for a short period.|Temporarily stops calls to a failing dependency.
contract|Contract testing|Two teams deploy independently and need to catch incompatible API changes before release.|Validates agreed expectations between consumers and providers.
mfa|Multifactor authentication|A leaked password alone must not grant access to an operator account.|Requires additional authentication factors.
least|Least privilege|A service that only reads records needs permissions limited to that operation.|Limits permissions to necessary actions and resources.
rotate|Secret rotation|A team wants to periodically replace an integration credential.|Replaces credentials to limit their validity and exposure.
tls|Encryption in transit|Information must be protected as it travels over a network.|Protects data during communication.
rest|Encryption at rest|Data persisted on disks and backups needs protection.|Protects stored data against access to the storage medium.
audit|Activity auditing|A team needs to reconstruct who changed a policy and when.|Records events attributable to identities for investigation and compliance.
oltp|OLTP|A platform must process many short, concurrent payments.|Optimizes short concurrent operational transactions.
olap|OLAP|An analyst needs to aggregate large volumes of historical sales.|Optimizes analytical queries and aggregations.
column|Columnar format|Analytical queries read only a few columns from very wide tables.|Stores values by column to reduce reads for selective queries.
partition|Date partitioning|Queries almost always filter by day and should skip other periods.|Separates data by date to enable partition pruning.
cdc|Change data capture|A transactional source must replicate inserts and updates without copying the whole table.|Captures incremental changes from a source.
lineage|Data lineage|An analyst needs to trace the inputs and transformations behind a report column.|Represents data origins and transformations.
ec2|Amazon EC2|A team must install a custom driver in a Linux virtual machine.|Provides compute capacity with guest operating system access.
lambda|AWS Lambda|Short code should run whenever a file arrives, without maintaining servers.|Executes event-driven functions on managed infrastructure.
fargate|AWS Fargate|A team needs to run ECS containers without managing compute instances.|Provides managed capacity for container tasks.
alb|Application Load Balancer|Two HTTP microservices need traffic routed by request path.|Routes application-layer traffic based on host, path, or other conditions.
asg|EC2 Auto Scaling|The number of instances behind a load balancer must increase with demand.|Scales and replaces group instances according to policies.
cloudfront|Amazon CloudFront|Users on different continents download the same static web assets.|Delivers content over an edge network that can cache it.
gateway|S3 gateway endpoint|Private instances need S3 access without NAT or a network interface per subnet.|Adds private S3 access via VPC route tables.
transit|AWS Transit Gateway|Dozens of VPCs need to connect through a shared routing hub.|Centralizes routing between attached networks.
direct|AWS Direct Connect|A data center requires dedicated connectivity to AWS without traversing the public internet.|Provides dedicated network connectivity between facilities and AWS.
resolver|Route 53 Resolver inbound endpoint|On-premises DNS servers must query private Route 53 hosted zones.|Receives forwarded DNS queries from connected networks.
nacl|Network ACL|A team wants stateless packet filtering at a subnet boundary.|Filters inbound and outbound traffic at the subnet level.
sg|Security group|An EC2 interface must accept HTTPS and automatically allow return traffic.|Applies stateful rules to associated resources.
kms|AWS KMS|An application needs to create and control managed encryption keys.|Manages cryptographic keys and authorized cryptographic operations.
guardduty|Amazon GuardDuty|A team needs alerts for suspicious activity detected in account signals.|Analyzes telemetry and generates threat findings.
macie|Amazon Macie|A team needs to discover personal data stored in S3 buckets.|Classifies sensitive information in S3 objects.
waf|AWS WAF|HTTP requests containing SQL injection patterns should be filtered.|Applies inspection rules to web requests.
scp|Service control policy|An organization wants to restrict allowed regions across member accounts in an OU.|Sets permission boundaries for organization member accounts.
secrets|AWS Secrets Manager|A database password must be stored and rotated.|Stores secrets and supports rotation workflows.
cloudwatch|Amazon CloudWatch|An alarm should fire when CPU usage stays above a threshold for several minutes.|Collects metrics and supports alarms.
cloudtrail|AWS CloudTrail|A team needs to identify the actor who called an API to delete a bucket.|Records API activity and information about its actor.
config|AWS Config|A team needs to continuously check whether resources meet a configuration rule.|Records configurations and evaluates resources against rules.
ssm|Systems Manager Session Manager|An operator needs a shell on a private EC2 instance without opening inbound SSH.|Manages sessions on configured instances without exposing administration ports.
fis|AWS Fault Injection Service|A team needs to terminate test instances under defined stop conditions.|Runs controlled experiments to test resilience.
backup|AWS Backup|A team needs central backup policies for several AWS resource types.|Centralizes backup plans and recovery point management.
s3|Amazon S3|A team wants to store millions of objects identified by key.|Provides object storage organized into buckets.
glue|AWS Glue crawler|A team needs to discover data lake file schemas and register them for querying.|Inspects data sources and updates Glue catalog tables.
athena|Amazon Athena|An analyst wants to query S3 files using SQL without provisioning a cluster.|Runs managed SQL queries over supported data sources.
dynamo|Amazon DynamoDB|An application needs low-latency key operations without managing database servers.|Provides a managed NoSQL key-value and document database.
kinesis|Kinesis Data Streams|Several consumers must read retained events from a real-time stream.|Ingests and retains event streams for continuous consumption.
lake|AWS Lake Formation|A data team wants to grant column-level permissions on registered lake tables.|Governs granular access to data lake resources.
vm|Azure Virtual Machines|A team needs to install software requiring access to a server operating system.|Provides virtual machines with guest operating system control.
apps|Azure App Service|A team wants to host a website on a managed application platform.|Runs web applications without direct operating system management.
functions|Azure Functions|A short task needs to run when an event arrives or a schedule fires.|Runs event-driven code using a function execution model.
aca|Azure Container Apps|A container workload needs to scale with queued messages without operating Kubernetes.|Runs managed containers with event-driven scaling.
aks|Azure Kubernetes Service|A team needs native Kubernetes resources in a managed cluster.|Provides a managed Kubernetes control plane.
vmss|Virtual Machine Scale Sets|Homogeneous virtual machines must scale together on demand.|Manages and scales sets of virtual machines.
pe|Azure Private Endpoint|A team needs to reach a storage account via a private IP inside its VNet.|Assigns a private interface to access a supported resource using Private Link.
er|ExpressRoute|An organization needs a private circuit between its premises and Azure.|Connects on-premises networks to Azure through provider-facilitated private connectivity.
vpng|Azure VPN Gateway|Two networks need to communicate using an IPsec tunnel over the internet.|Provides encrypted network-to-network connectivity.
nsg|Network Security Group|Subnet traffic must be restricted by source, destination, and port.|Filters traffic using stateful network rules.
front|Azure Front Door|A global HTTP site needs routing to healthy origins and edge delivery.|Routes global web traffic and accelerates application delivery.
bastion|Azure Bastion|An administrator must use RDP without exposing the VM's port publicly.|Provides managed administrative access to virtual machines.
keyvault|Azure Key Vault|Several applications need to retrieve secrets from an access-controlled store.|Protects keys, certificates, and secrets using configurable permissions.
managedid|Managed identity|An Azure application needs to authenticate without storing a password.|Provides an Azure-managed Entra identity for obtaining tokens.
policy|Azure Policy|Deployments should be denied when they use a disallowed location.|Evaluates and enforces resource configuration rules.
rbac|Azure RBAC|An operator needs read permissions scoped to a resource group.|Assigns Azure resource permissions to identities at specific scopes.
defender|Microsoft Defender for Cloud|A team wants to detect risky cloud workload configurations.|Assesses security posture and provides recommendations.
purview|Purview sensitivity labels|A payroll document needs classification and encryption that travel with it.|Classifies content and can apply persistent protection.
monitor|Azure Monitor|A team needs an alert based on application metrics.|Collects telemetry and provides alert rules.
activity|Azure Activity Log|A team wants to identify who resized a VM through the management plane.|Records Azure control-plane operations.
advisor|Azure Advisor|A team wants optimization recommendations based on existing resources.|Analyzes resources and suggests cost, reliability, and other improvements.
health|Azure Service Health|A team needs to know whether an Azure incident affects its subscriptions.|Reports service incidents and relevant maintenance.
backupaz|Azure Backup|A VM must be recovered from a point retained under a backup policy.|Manages backups and recovery points for supported resources.
arc|Azure Arc|An on-premises server needs to be managed through the Azure control plane.|Represents external resources in Azure for hybrid management.
blob|Azure Blob Storage|A team wants to store a large volume of binary files and objects.|Provides object storage.
sqldb|Azure SQL Database|A team needs managed relational SQL without maintaining an operating system.|Provides a managed relational database engine.
adls|Azure Data Lake Storage Gen2|An analytics lake needs a hierarchical namespace and directory-level access controls.|Adds a hierarchical namespace for analytics workloads.
adf|Azure Data Factory|A team needs to coordinate periodic extraction and copying from several sources.|Orchestrates data movement and transformation pipelines.
servicebus|Azure Service Bus|An application needs enterprise queues with processing acknowledgments.|Provides managed messaging using queues and topics.
eventgrid|Azure Event Grid|A service must react to object creation through subscription-based notifications.|Routes discrete events to configured subscribers.
pim|Entra PIM|Administrators need to activate a role temporarily after approval.|Manages eligibility and time-limited privilege activation.
ca|Conditional Access|MFA must be required when a sign-in meets defined risk conditions.|Evaluates sign-in signals and applies access controls.
accessreview|Access reviews|Owners must regularly confirm that guests still need access.|Recertifies memberships and access permissions.
entitlement|Entitlement Management|A team wants to group resources and automate project access requests.|Manages access packages and their lifecycle.
analyticsrule|Analytics rule|A query must create alerts when an attack pattern appears.|Evaluates data to generate security alerts.
sentinelworkbook|Workbook|A SOC needs an interactive dashboard for incident trends.|Presents data and queries in interactive reports.
playbook|Playbook|A Logic Apps workflow should enrich incidents with IP reputation.|Runs response and enrichment workflows.
watchlist|Watchlist|A list of critical assets must be available to enrich security queries.|Provides reference datasets for event correlation and queries.
query|Query Store|A database needs to retain plans and statistics to investigate a query regression.|Records query, plan, and performance history.
pitr|Point-in-time restore|Records were accidentally deleted and a pre-incident copy is needed.|Restores a database to a timestamp within its retention period.
failover|Failover group|An application needs a stable endpoint when its Azure SQL primary region changes.|Coordinates replication and failover with stable endpoints.
sqlparams|Parameterized query|A user input value must reach the engine without altering the SQL command.|Separates input values from executable query syntax.
pk|Partition key|An application needs to distribute documents and requests across partitions.|Determines the logical distribution of container data.
ru|Request Unit|A team needs a common unit to measure the cost of Cosmos DB operations.|Normalizes the resource consumption of database operations.
ttl|Time to live|Session documents should expire automatically after a set period.|Deletes items after their configured expiration interval.
changefeed|Change feed|A consumer must respond to item changes without scanning the entire collection.|Exposes container changes for incremental processing.
unity|Unity Catalog|A team needs centralized table permissions and lineage across workspaces.|Governs data and AI assets in Databricks.
deltamerge|Delta MERGE|An incremental job must update matches and insert new rows.|Applies conditional updates and inserts in a Delta table.
deltaopt|Delta OPTIMIZE|Thousands of small files are hurting reads from a Delta table.|Compacts files to optimize their physical layout.
autoloader|Auto Loader|New files arriving in cloud storage must be ingested incrementally.|Discovers new files and processes them incrementally.
hostpool|Host pool|A team needs to group machines offering remote desktops.|Groups Azure Virtual Desktop session hosts.
fslogix|FSLogix profile container|A user's profile must follow them when they switch session hosts.|Mounts persistent profiles from a container.
appgroup|Application group|Selected users should receive a specific set of published applications.|Defines which published resources authorized users can launch.
avdscale|Scaling plan|Session hosts should turn on during office hours.|Adjusts host pool capacity by schedule and demand.
hanasr|HANA System Replication|An SAP HANA database must replicate to a secondary instance for availability.|Replicates HANA database changes to a secondary system.
pacemaker|Pacemaker|Two Linux servers must coordinate startup and movement of SAP resources after failures.|Manages high-availability cluster resources on Linux.
hanacert|SAP HANA-certified SKU|A team needs to choose a supported VM for a production HANA database.|Verifies compute compatibility with vendor requirements.
sapfence|Fencing|A cluster must isolate a suspect node before another node can write.|Isolates nodes so two instances cannot control the same resource.
adds|Active Directory Domain Services|On-premises Windows computers need centralized domain authentication.|Provides directory services, authentication, and domain organization.
gpo|Group Policy|Security settings must be distributed to computers in an organizational unit.|Applies managed settings to domain users and computers.
wfc|Failover Clustering|A Windows Server role must stay available when its active node fails.|Coordinates nodes and moves roles after a failure.
hyperv|Hyper-V|A physical Windows host must run several virtual machines.|Provides a hypervisor for virtual machines.
customconnector|Custom connector|Copilot Studio needs to call operations defined by an internal API.|Exposes API operations with configurable parameters and authentication.
kno|Knowledge source|An agent must answer using information from approved company manuals.|Provides content the agent can consult while generating answers.
topic|Conversation topic|A designer needs to guide users through steps when they express a particular intent.|Defines a conversation flow with triggers, questions, and actions.
environment|Power Platform environment|Development and production agents need to be separated with their own resources.|Groups and isolates Power Platform resources within administrative boundaries.
bedrock|Amazon Bedrock|A team wants to invoke managed foundation models from multiple providers through AWS.|Provides managed access to foundation models and tools for generative applications.
guardrails|Bedrock Guardrails|A team must block prohibited topics in an assistant's inputs and outputs.|Applies filters and policies to model interactions.
sagemaker|Amazon SageMaker AI|A team needs managed training jobs for custom models using containers and accelerators.|Provides managed infrastructure to train and deploy machine learning models.
batch|SageMaker Batch Transform|A team needs nightly predictions for a file without keeping an endpoint running.|Runs inference over datasets as batch jobs.
textract|Amazon Textract|A team wants to extract fields and tables from scanned forms.|Detects text, tables, and fields in documents.
rekognition|Amazon Rekognition|A video file needs object labels and visual content detection.|Analyzes images and videos using managed computer vision models.
docintel|Azure AI Document Intelligence|A team needs to extract amounts and vendors from invoices with different layouts.|Extracts text and structured fields from documents.
search|Azure AI Search|An assistant must find relevant passages using text matches and vector similarity.|Provides a search index with hybrid query capabilities.
speech|Azure AI Speech|An application must transcribe a recorded conversation.|Provides speech recognition and synthesis.
vision|Azure AI Vision|A team needs captions and object detection for photographs.|Analyzes visual content using computer vision capabilities.
contentsafety|Azure AI Content Safety|A team must score harmful content before showing it to users.|Detects categories of potentially harmful content.
mlstudio|Azure Machine Learning|A team needs reproducible training jobs and custom model deployments.|Manages machine learning runs, artifacts, and deployments.
sqs|Amazon SQS|A producer needs to accumulate tasks while workers recover from an outage.|Decouples producers and consumers using queues.
sns|Amazon SNS|A notification should be delivered to several endpoints when published to a topic.|Distributes notifications through a publish-subscribe model.
eventbridge|Amazon EventBridge|Events from different services need routing based on their contents.|Routes events from connected sources to targets based on rules.
step|AWS Step Functions|A workflow needs to coordinate steps, branches, and retries while exposing its state.|Orchestrates operations with state machines.
logic|Azure Logic Apps|A team wants to automate an approval process using visual connectors.|Orchestrates integrations with triggers, actions, and connectors.
apim|Azure API Management|Published APIs need request quotas and policies for clients.|Manages API exposure through a gateway with policies.
acr|Azure Container Registry|A company needs to store container images in a private registry.|Hosts container artifacts with controlled access.
appconfig|Azure App Configuration|Several apps need to read feature flags from a common location.|Centralizes application settings and feature flags.
locks|CanNotDelete lock|A resource group must remain editable while preventing accidental deletion.|Blocks delete operations in the management plane.
scope|Resource-group role assignment|An operator needs to manage VMs in one resource group without managing the rest of the subscription.|Scopes Azure RBAC permissions to resources in the group.
policyassign|Azure Policy assignment|A subscription must reject new resources outside approved regions.|Applies a policy definition to a scope.
budget|Azure Cost Management budget|Finance wants alerts when forecast spending exceeds its monthly limit.|Monitors actual or forecast costs against thresholds.
sas|User delegation SAS|An app must temporarily share read access to a blob using a signature backed by Microsoft Entra.|Delegates limited Blob Storage access using a user delegation key.
blobsoft|Blob soft delete|An operator needs to recover an accidentally deleted blob within its retention period.|Retains deleted blobs for a configurable period.
lifecycle|Blob lifecycle policy|Unused blobs should move to a cheaper tier after a specified number of days.|Automates tier changes or deletions through rules.
zrs|Zone-redundant storage|An account must keep data copies across zones in the same region.|Synchronously replicates data across availability zones in a region.
azcopy|AzCopy|A command-line task needs to transfer thousands of local files to a blob container.|Copies files to and from Azure Storage at the command line.
bicep|Bicep template|A team needs to declare Azure resources and parameters in a reusable file.|Describes declarative infrastructure for Azure Resource Manager.
extension|Custom Script Extension|A VM needs to download and run a configuration script after deployment.|Runs configuration scripts through the VM agent.
slot|App Service deployment slot|A team wants to validate a new version at a staging URL before swapping it into production.|Maintains a deployment environment that can be swapped with another slot.
autoscale|VM Scale Sets autoscale|The instance count must increase when average CPU rises.|Adjusts instance count using metric-based rules.
peering|Virtual network peering|Two VNets with nonoverlapping address spaces need private IP connectivity over the Azure backbone.|Connects virtual networks over private routes on the backbone.
udr|User-defined route|A subnet must send outbound traffic through a virtual network appliance as the next hop.|Allows explicit selection of the next hop for a prefix.
ipflow|IP flow verify|An administrator needs to identify which NSG rule allows or denies a TCP flow to a VM.|Checks the security decision and applicable rule for a specific flow.
azlb|Azure Load Balancer|Several machines must receive TCP traffic through a frontend IP and health probe.|Distributes layer-four traffic across destinations responding to the probe.
privdns|Private DNS zone virtual network link|Machines in another VNet need to resolve records in an Azure private DNS zone.|Associates a private zone with a VNet for record resolution.
diag|Diagnostic setting|Resource logs from a storage account must be sent to Log Analytics.|Routes resource logs and metrics to configured destinations.
actiongroup|Action group|When an Azure Monitor alert fires, it must email the on-call team.|Defines reusable alert recipients and actions.
vault|Recovery Services vault|An administrator needs to store and manage recovery points for backed-up virtual machines.|Manages backup items and recovery points for Azure Backup.
kql|KQL query in Log Analytics|A team needs to filter and aggregate logs from several machines to investigate an incident.|Queries log tables using filtering and aggregation.
sitefail|Azure Site Recovery failover|A replicated application needs to start its machines in the recovery region during an outage.|Activates replicated workloads in the recovery target.
restoredisk|VM disk restore|An operator needs to recover disks from a backup point for inspection without replacing the original VM.|Recovers disks as separate resources for inspection or reconstruction.
`;
