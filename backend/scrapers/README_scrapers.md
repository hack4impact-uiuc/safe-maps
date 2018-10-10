# Data Scrapers - *Cut to the Case*

### Data
| Data                           | Sourced?                       | Implemented?               |
|--------------------------------|--------------------------------|----------------------------|
| Open Businesses                | Yes (Yelp API)                 | Scraper yes, db storage no |
| Blue Lights (Emergency Phones) | In progress                    | no                         |
| Streetlights                   | In progress                    | no                         |
| Illini Alerts                  | Yes (twitter API)              | no                         |
| Police Blotter                 | In progress (CrimeReports API) | no                         |
| VeoRides                       | No, not allowed :(             | N/a                        |
| Bus Stops                      | Yes (CUMTD API)                | no                         |
| SafeRides locations            | In progress (CUMTD API)        | no                         |

### Scheduling

So probably going to use apscheduler package for scheduling scrapers to run.

    from apscheduler.schedulers.background import BackgroundScheduler

Soon we will decide how often to run the various jobs.
