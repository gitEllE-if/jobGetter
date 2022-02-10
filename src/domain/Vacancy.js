export class Vacancy {
    constructor(provider, origin_id, name, logo_url, salary, salary_from, salary_to, currency,
        published_at, area, requirement, responsibility, url, employer_name, description, schedule,
        experience, no_experience, remote, pinned) {
        this.provider = provider;
        this.origin_id = origin_id;
        this.name = name;
        this.logo_url = logo_url;
        this.salary = salary;
        this.salary_from = salary_from;
        this.salary_to = salary_to;
        this.currency = currency;
        this.published_at = published_at;
        this.area = area;
        this.requirement = requirement;
        this.responsibility = responsibility;
        this.url = url;
        this.employer_name = employer_name;
        this.description = description;
        this.schedule = schedule;
        this.experience = experience;
        this.no_experience = no_experience;
        this.remote = remote;
        this.pinned = pinned;
    }

    getProvider() {
        return this.provider;
    }

    isProvidedBy(providerName) {
        return this.provider === providerName
    }
}