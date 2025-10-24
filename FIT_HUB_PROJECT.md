# Fit Hub Project Referral Workflow

This document outlines the life cycle of a referral in the Fit Hub project and the
responsibilities of each role involved.

## 1. Referral Creation (Role 1: Referral Agency)

* **Action:** From the Referral Agency Dashboard, use **Quick Actions → Create Referral**.
* **Result:** Submitting the form creates a new referral with status **"New"**.
* **Notifications:** Both the referral agency user and the hub user receive alerts that a new referral has been submitted.

## 2. Referral Matching (Role 2: Hub User)

* **Action:** The hub user reviews incoming referrals from the Hub Dashboard.
* **Match:** When ready, the hub user uses the **Match** action to assign a facility to the referral.
* **Result:** The referral status updates to **"Matched"**.
* **Visibility:** Role 1 and Role 2 can monitor the status change through their dashboard KPIs and recent-activity feeds.

## 3. Facility Decision (Role 3: Facility User)

* **Action:** The assigned facility reviews the matched referral in the Facility Dashboard.
* **Decision:** The facility either **accepts** or **declines** the referral.
* **Result:**
  * Accepting the referral moves it to **"Completed"** status.
  * Declining the referral moves it to **"Rejected"** status.
* **Notifications:** Both the hub user and the originating agency are notified of the outcome.
* **History:** Completed referrals appear in the **Completed** section for all roles, providing a shared record of finished work.

## Status Summary

| Status     | Triggered By                    | Description                                                      |
|------------|----------------------------------|------------------------------------------------------------------|
| New        | Referral agency submits referral | Initial state after creation via Quick Actions → Create Referral |
| Matched    | Hub user matches to facility     | Facility assignment completed and awaiting facility response     |
| Completed  | Facility accepts referral        | Referral fulfilled successfully                                  |
| Rejected   | Facility declines referral       | Referral closed without acceptance                               |

## Notifications Overview

* **Creation:** Referral agency and hub user.
* **Matching:** Status visible to referral agency and hub user via dashboards.
* **Completion/Decline:** Referral agency and hub user receive final outcome notifications.

This workflow ensures each role has clear responsibilities and visibility into referral progress across the Fit Hub project.
