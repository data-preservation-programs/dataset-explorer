# The Dataset Explorer Initiative

## Objective

The Slingshot Dataset Explorer program is an initiative to guarantee permanence of data onboarded through the Slingshot program. Deal renewals are offered in order to ensure long term availability of open datasets on the Filecoin network.

## What is it?

The Slingshot community is committed to preserving humanity's most important datasets on the Filecoin network. Datasets stored in the early phases of Slingshot are reaching the end of their initial deal lifecycle. Dataset Explorer serves as a mechanism to continue the storage of those datasets on the Filecoin network, ensuring permanent data storage for Slingshot data.

## What data qualifies for a deal?

- Data (piece CIDs, e.g., `baga…`) stored in Slingshot v2 deals expiring in the next 60 days
- CIDs will be stored up to 10 times, pursuant to the following distribution requirements:
  - Max 1 replica per datacenter/city
  - Max 2 replicas per country
  - Max 4 replicas per continent
- CIDs will be eligible for deal proposals for SPs with the following limitations:
  - Max 1 replica per minerID
  - Max 2 replicas per Storage Provider organization

**Note the following:**

- The Dataset Explorer deal engine will maintain a maximum of 10 active and proposed deals, so CIDs may become re-eligible for replication in case deals are not sealed in 72 hours
- If the SP storing the original data attempts to re-store a CID that already has 10 replicas stored through Dataset Explorer, the deal engine will still send a deal proposal to the original Slingshot minerID

## Who can participate?

Storage Providers interested in serving deals from the Dataset Explorer deal engine should sign up to participate [here](https://docs.google.com/forms/d/e/1FAIpQLSe5bpkD5RJeHGMNx3CpkV3a6UA2i7aroNE5DlGUdQF0mQU8DQ/viewform?usp=sf_link). Any SP can participate in the program, including:

- SPs who still have an active deal for the data in question
- SPs who did not make the original deal, but are able to procure the data from the original Slingshot participant (client) or retrieve the data with the SP who stored the original piece
- SPs who who did not make the original deal, but are are able to retrieve data from the original source of data and generate the same CAR file + CID

**SPs participating in the program should be:**

- Eligible to win block rewards (have >10TiB of power)
- Set to receive offline-flow (off-network data transfer) deal proposals
- Without faults in the past 48 hours
- Able to activate deals within 72h of receiving proposal
- Continuously dialable by network clients to remain eligible to receive deal proposals from the Dataset Explorer deal engine

## Storage Requirements

- Participating SPs commit to serving fast retrievals for this data throughout the duration of the deal, for 0FIL. SPs with retrieval success rates below 60% will be suspended from participating in the Dataset Explorer program (for a minimum of 6 weeks)
- SPs suspended can become re-eligible by successfully serving retrievals during the 6 week period where retrieval sampling on their minerIDs will continue

## How it works

1. Check this list of CIDs eligible for deal proposals and identify ones that you want to store
2. Ensure your minerID is on the list of eligible SPs [by going through this application process](https://docs.google.com/forms/d/e/1FAIpQLSe5bpkD5RJeHGMNx3CpkV3a6UA2i7aroNE5DlGUdQF0mQU8DQ/viewform?usp=sf_link)
3. Request deals from the Dataset Explorer endpoint (details coming soon)
    1. These deals will be verified deals with DataCap
    2. Deals will be made for maximum practical duration (~532 days)

## Questions?

If you have any questions, please ask them in the [#slingshot-Dataset Explorer](https://filecoinproject.slack.com/archives/C0377FJCG1L) Filecoin Slack channel.
