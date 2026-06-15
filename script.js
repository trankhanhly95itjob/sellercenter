document.addEventListener('DOMContentLoaded', () => {
  const btnAddStore = document.getElementById('btnAddStore');
  const warehouseContainer = document.getElementById('warehouseContainer');
  const sellerForm = document.getElementById('sellerForm');

  const urlParams = new URLSearchParams(window.location.search);
  const sellerId = urlParams.get('id');

  if (sellerId && sellerForm) {
    document.querySelector('.content-title').textContent = 'Chi tiết nhà bán';
    document.querySelector('#sellerForm .btn-primary').textContent = 'Cập nhật';
    const formControls = document.querySelectorAll('.panel:first-of-type .form-control');
    formControls.forEach(ctrl => {
      ctrl.disabled = true;
      ctrl.style.backgroundColor = '#e9ecef';
    });

    if (sellerId === '111') {
      document.querySelector('input[name="businessSellerName"]').value = 'CÔNG TY CỔ PHẦN TEKO VIỆT NAM';
      document.querySelector('select[name="supplierId"]').value = '41420';
      document.querySelector('select[name="companyId"]').value = '1';
      document.querySelector('select[name="companyBrandId"]').value = '2';
      document.querySelector('select[name="websiteId"]').value = '2';
      
      warehouseContainer.innerHTML = '';
      const existingStores = [
        { name: '30479 - FBM_HCM - Kho đối tác TEKO', id: '30479' },
        { name: '30480 - FBM_HNO - Kho đối tác TEKO', id: '30480' },
        { name: '30481 - FBM_DNA - Kho đối tác TEKO', id: '30481' }
      ];
      existingStores.forEach(s => {
        const item = document.createElement('div');
        item.className = 'store-item existing-store';
        item.innerHTML = `
          <div class="grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Tên kho hàng (Đã tạo)</label>
              <input type="text" class="form-control" value="${s.name}" disabled style="background-color: #e9ecef;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Mapping Kho ERP MWG</label>
              <select class="form-control" disabled style="background-color: #e9ecef;">
                <option value="${s.id}" selected>${s.name}</option>
              </select>
            </div>
          </div>
        `;
        warehouseContainer.appendChild(item);
      });
    } else if (sellerId === '112') {
      document.querySelector('input[name="businessSellerName"]').value = 'CÔNG TY TNHH PHÁT TRIỂN PHẦN MỀM ABC';
      document.querySelector('select[name="supplierId"]').value = '41421';
      document.querySelector('select[name="companyId"]').value = '16';
      document.querySelector('select[name="companyBrandId"]').value = '23';
      document.querySelector('select[name="websiteId"]').value = '17';
      
      warehouseContainer.innerHTML = '';
      const existingStores = [
        { name: '30501 - FBM_HCM - Kho đối tác ABC', id: '30501' },
        { name: '30502 - FBM_HNO - Kho đối tác ABC', id: '30502' }
      ];
      existingStores.forEach(s => {
        const item = document.createElement('div');
        item.className = 'store-item existing-store';
        item.innerHTML = `
          <div class="grid-2">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Tên kho hàng (Đã tạo)</label>
              <input type="text" class="form-control" value="${s.name}" disabled style="background-color: #e9ecef;">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Mapping Kho ERP MWG</label>
              <select class="form-control" disabled style="background-color: #e9ecef;">
                <option value="${s.id}" selected>${s.name}</option>
              </select>
            </div>
          </div>
        `;
        warehouseContainer.appendChild(item);
      });
    }
  }

  // Handle Add Store
  if (btnAddStore && warehouseContainer) {
    btnAddStore.addEventListener('click', () => {
      const storeItem = document.createElement('div');
      storeItem.className = 'store-item';
      storeItem.innerHTML = `
        <button type="button" class="btn-remove-store" onclick="removeStore(this)">Xóa kho</button>
        <div class="grid-2">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Tên kho hàng</label>
            <input type="text" class="form-control store-name-input" placeholder="Nhập tên kho hàng" required>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Mapping Kho ERP MWG</label>
            <select class="form-control store-id-input" required>
              <option value="">Chọn kho ERP MWG</option>
              <option value="30479">30479 - FBM_HCM - Kho đối tác TEKO</option>
              <option value="30480">30480 - FBM_HNO - Kho đối tác TEKO</option>
              <option value="30481">30481 - FBM_DNA - Kho đối tác TEKO</option>
            </select>
          </div>
        </div>
      `;
      warehouseContainer.appendChild(storeItem);
    });
  }

  // Handle Form Submit (Mock JSON Generation)
  if (sellerForm) {
    sellerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(sellerForm);
      const storeMappings = [];

      // Collect store mappings
      const storeItems = document.querySelectorAll('.store-item:not(.existing-store)');
      storeItems.forEach(item => {
        const nameInput = item.querySelector('.store-name-input');
        const idInput = item.querySelector('.store-id-input');

        if (nameInput && idInput && nameInput.value && idInput.value) {
          storeMappings.push({
            sellerStoreName: nameInput.value,
            mwgStoreId: parseInt(idInput.value, 10)
          });
        }
      });

      if (sellerId) {
        if (storeMappings.length === 0) {
          alert('Không có kho hàng mới nào được thêm!');
          return;
        }
        const newStoresPayload = {
          businessSellerId: parseInt(sellerId, 10),
          storeMappings: storeMappings
        };
        console.log('--- Payload: POST /businessseller/store/add ---');
        console.log(JSON.stringify(newStoresPayload, null, 2));
        alert('Đã bổ sung kho mới! Vui lòng mở Developer Console để xem JSON payload.');
      } else {
        const payload = {
          businessSellerName: formData.get('businessSellerName'),
          supplierId: parseInt(formData.get('supplierId'), 10),
          companyId: parseInt(formData.get('companyId'), 10),
          companyBrandId: parseInt(formData.get('companyBrandId'), 10),
          websiteId: parseInt(formData.get('websiteId'), 10),
          storeMappings: storeMappings
        };
        console.log('--- Payload: POST /businessseller/onboard ---');
        console.log(JSON.stringify(payload, null, 2));
        alert('Đã tạo nhà bán! Vui lòng mở Developer Console để xem JSON payload.');
      }
    });
  }
});

// Expose globally for inline onclick
window.removeStore = function (btn) {
  const storeItem = btn.closest('.store-item');
  if (storeItem) {
    storeItem.remove();
  }
};
