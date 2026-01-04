# InfraDiff 🛠️
**Explain Terraform changes before they cause downtime**

InfraDiff is a CLI tool that analyzes Terraform plan outputs and explains the **real-world impact** of infrastructure changes — including **risk**, **downtime**, and **plain-English explanations** — before you deploy.

Built for developers and DevOps engineers who want confidence in their infrastructure changes.

---

## 🧠 Inspiration
As a beginner DevOps Engineer, my day-to-day work often involves provisioning cloud infrastructure using Terraform. As projects grow, Terraform plans become large and difficult to reason about. Manually verifying whether a plan introduces unintended or risky changes—especially those that could cause service disruptions—is tedious and error-prone.

InfraDiff was built to solve this problem.

---

## 🚀 What InfraDiff Does
InfraDiff takes a Terraform plan (in JSON format) and tells you:

- 🔴 Whether a change is **risky**
- ⏱️ Whether it may cause **downtime**
- 🧠 What the change **actually means**, explained in plain English

Instead of scanning raw diffs, developers get actionable insights instantly.

> InfraDiff currently supports Terraform plans for **Vultr** infrastructure.

---

## 🏗️ How It Works
InfraDiff uses a **hybrid approach**:

- **Deterministic rules** decide risk and downtime  
- **Gemini AI** is used only to explain the impact and suggest safer alternatives  

This design avoids AI hallucinations in safety-critical infrastructure decisions.

---

## 🧩 Architecture Overview
- **Terraform Plan Parser** – extracts resource changes from plan JSON  
- **Impact Engine** – applies provider-specific rules (Vultr)  
- **AI Explanation Layer** – generates human-friendly explanations  
- **CLI Interface** – runs locally in a single command  

---

## 🛠️ How I Built It
- **Language:** TypeScript  
- **CLI:** Node.js + Commander  
- **AI:** Gemini 2.5  
- **IaC:** Terraform (Vultr provider)  

InfraDiff is packaged as an **installable npm CLI** and designed to be reusable and extensible.

---

## 🧪 How to Run

### 1️⃣ Save your Terraform plan as JSON
```bash
terraform plan -out tf.plan
terraform show -json tf.plan > plan.json
```

### 2️⃣ Analyze the plan with InfraDiff
```bash
#in root directory
npm run build
npm install -g .
npm link

#in the directory where your terraform plan resides:
infradiff analyze plan.json
```

InfraDiff will output:
- Risk level
- Downtime warning
- Plain-English explanation of the change


---

## 🔮 What’s Next for InfraDiff
- Support for additional cloud providers (AWS, GCP, Azure)  
- Support for multiple AI models  
- CI/CD integration to block risky deployments automatically  
- Public npm publication  

---

## 💡 Why InfraDiff?
> Terraform tells you *what* will change.  
> InfraDiff tells you *what it means*.

---

Built for **MLH Hacks for Hackers** ❤️
