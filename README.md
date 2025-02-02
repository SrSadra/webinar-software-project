# Online Webinar Site using nestjs & react
 
It was tasked to simulate online webinar site.we used nestjs framework for backend & react as frontend.Multiple technologies has been used for this project such as rabbitmq for microservice based communication, mysql as db and typeorm as orm, jwt token for user protection in front and also back, cookies, class validator for validating input & more. Cloudinary is service for storing data such as file and images in server so we used it in order to store data on server instead of local memory. 
users can buy webinars and their transaction and webinar will be saved in db. they can also comment below webinar episodes & rate them. add to cart is only available when user is authorized.
some feautred is not working but will be developed as soon as possible. 


## Demo 



## How to Use
first go to respecting directory by cd "webiline_front" or cd "webinar-back" and then:

for frontend initialize the env variables and run

```
npm run dev
```
for backend in order to start all microservices

```
npm run start:all
```


## Note
1- you can change ports as you want



License
=======

    Copyright 2025 Mohammad Sadra Sarparandeh & Alireza Alizadeh
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
