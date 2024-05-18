const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },
 
  async deleteOldCache() {
    const cachesName = await caches.keys();
    cachesNames
        .filter((name) => name !== 'Restaurant\'s-V1')
        .map((filteredName) => caches.delete(filteredName));
  },
 
  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
        this._fetchRequest(request);
        return response;
    }
    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open('Restaurant\'s-V1')
  },

  async _fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
        return response;
    }

    await this._addCache(request);
    return response;
  },

  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request);
  },
};
 
export default CacheHelper;