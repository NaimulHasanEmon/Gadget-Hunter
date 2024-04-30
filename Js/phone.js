const loadPhone = async (searchedPhone = 'iPhone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // Clear Phone container before loading phones
    phoneContainer.textContent = '';

    // Display show all button condition
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length >= 5 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // Display only first 5
    if (!isShowAll) {
        phones = phones.slice(0, 5);
    }
    phones.forEach(phones => {
        // 1. Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl mt-[24px] mx-[10px]`;
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10 bg-[rgba(13, 110, 253, 0.05)]">
                <img src="${phones.image}" alt="Phones"
                    class="rounded-xl hover:scale-105 duration-100" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title text-black">${phones.phone_name}</h2>
                <p class="text-slate-600 text-2xl font-bold">Price: 55,000 Taka</p>
                <p class="text-slate-600">There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions">
                    <button onclick = 'handleShowDetails("${phones.slug}"); show_details_modal.showModal()' class="btn btn-primary text-xl hover:scale-110 duration-350">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });

    // Hide loading indicator
    toggleLoadingSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText.toLowerCase(), isShowAll);
}

// Toggle loading indicator
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    }
    else {
        loadingSpinner.classList.add("hidden");
    }
}

// Handle show all button
const handleShowAll = () => {
    handleSearch(true);
}

// Handle show details button
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`
    )
    const data = await res.json();
    console.log(data.data); 
    showPhoneDetails(data);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone?.data?.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone?.data?.image}" style="border-radius: 16px" alt="">
    <p>Storage: ${phone?.data?.mainFeatures?.storage}</p>
    <p>Display Size: ${phone?.data?.mainFeatures?.displaySize}</p>
    <p>Chipset: ${phone?.data?.mainFeatures?.chipSet}</p>
    <p>Memory: ${phone?.data?.mainFeatures?.memory}</p>
    <p>Slug: ${phone?.data?.slug}</p>
    <p>Release data: ${phone?.data?.releaseDate}</p>
    <p>Brand: ${phone?.data?.brand}</p>
    <p>GPS: ${phone?.data?.others?.GPS || "GPS is not available"}</p>
    `;
    show_details_modal.showModal();
}

loadPhone();