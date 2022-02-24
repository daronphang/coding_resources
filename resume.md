### Performed data mining with application of technical knowledge and process judgement to develop data-oriented corrective and preventive solutions for yield/RDA highlights while striking a balance between quality and cost.
- Resolution of defect highlight for V15B with strong collaboration with vendor/equipment to identify the root cause of temperature abnormality (pyrohub).
-  


#### Difficulties


### Executed designed experiments and performed post-data analysis involving statistical plots and wafer profiling while working closely with Vendors, Manufacturing and Process Integration for driving cost/yield improvement projects. 


### Provided guidance and developed new procedures relating to process and equipment qualifications to address process/manufacturing deviations.

### Facilitated five major deviations with application of 8D methodology to identify gaps, root-cause and implement effective actions to prevent recurrence of events. 

#### 7 lots from B47R processed at 4800-11 GATE OXIDATION encountered NAA THK Oxide OOCL due to TELF7AJ100 Zero BOT H2 Gas Flow from 1/5/2022 - 1/7/2022
Why1: There was no H2 gas flow at BOTTOM position of furnace during oxidation process. 
Why2: MFC controlling BOTTOM H2 gas flow was closed.
Why3: H2 gas flow setpoint at BOTTOM position after R2R compensation was tuned below the MFC spec flowrate defined by vendor (+/- 2% of full flow 1SLM).
Why4: Existing RPA limits in GERM did not cater for minimum MFC spec flow.
Why5: Existing Micron guideline for defining tunable knob limits did not consider the tolerance of MFC defined by vendors.

Review all existing GeRM RPA limits and ensure they are aligned to MFC flow tolerance range.
Setup feature in MISO to detect MFC drift between setpoint and actual flow.

#### 11 lots, 275 wafers of B27A processed at 4110-45 SL NITRIDE DEP executed the wrong recipe during F10W to F10N offload between 4/12 to 7/10/2021
Why1: Affected lots were overcompensated at 47/12/32/10L IMPLANT.
Why2: Offloaded lots to 10N processed previous POR recipe with lower thermal budget (680C) instead of updated conversion recipe (760C).
Why3: GeRM setup for conversion missed out updating complex offload attribute for LRQ (Light-Requalification) during “promotion to baseline”.
Why4: There was lack of awareness from TM to update complex offload attribute during baseline execution.
Why5: Existing Micron area guideline did not specify the requirement of complex attribute.

To perform a sweep in GeRM across all processes and DIDs for any complex offload attribute not updated during baseline promotion.
To enhance “Exception by Corr Item”  report to check for any existing LRQ attribute in receiving site during GeRM baseline promotion.


