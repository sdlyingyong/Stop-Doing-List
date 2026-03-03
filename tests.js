// 测试用例 - 不为清单应用
// 运行方法: 在浏览器控制台中执行这些测试用例

console.log('🧪 开始执行不为清单应用测试用例...');

// 测试1: 基本功能测试
function testBasicFunctionality() {
  console.log('📝 测试1: 基本功能测试');
  
  // 检查IndexedDB是否可用
  if (!window.indexedDB) {
    console.error('❌ IndexedDB不可用');
    return false;
  }
  console.log('✅ IndexedDB可用');
  
  // 检查主要DOM元素是否存在
  const pyramidView = document.querySelector('[data-testid="pyramid-view"]');
  const decisionsView = document.querySelector('[data-testid="decisions-view"]');
  const auditView = document.querySelector('[data-testid="audit-view"]');
  
  if (!pyramidView || !decisionsView || !auditView) {
    console.error('❌ 主要视图元素缺失');
    return false;
  }
  console.log('✅ 主要视图元素存在');
  
  return true;
}

// 测试2: 数据存储测试
function testDataStorage() {
  console.log('💾 测试2: 数据存储测试');
  
  return new Promise((resolve) => {
    const request = indexedDB.open('NotToDoDB', 1);
    
    request.onerror = () => {
      console.error('❌ 无法打开IndexedDB');
      resolve(false);
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('pyramid') || !db.objectStoreNames.contains('decisions')) {
        console.error('❌ IndexedDB存储对象不存在');
        resolve(false);
        return;
      }
      console.log('✅ IndexedDB存储对象存在');
      
      // 测试写入数据
      const transaction = db.transaction(['pyramid'], 'readwrite');
      const store = transaction.objectStore('pyramid');
      
      const testItem = {
        id: 'test-item-123',
        text: '测试项目',
        category: 'work',
        reflection: '测试反思',
        timestamp: Date.now(),
        logs: []
      };
      
      const addRequest = store.add(testItem);
      addRequest.onsuccess = () => {
        console.log('✅ 数据写入成功');
        
        // 测试读取数据
        const readTransaction = db.transaction(['pyramid'], 'readonly');
        const readStore = readTransaction.objectStore('pyramid');
        const getRequest = readStore.get('test-item-123');
        
        getRequest.onsuccess = () => {
          if (getRequest.result && getRequest.result.text === '测试项目') {
            console.log('✅ 数据读取成功');
            
            // 清理测试数据
            const deleteTransaction = db.transaction(['pyramid'], 'readwrite');
            const deleteStore = deleteTransaction.objectStore('pyramid');
            deleteStore.delete('test-item-123');
            
            deleteStore.onsuccess = () => {
              console.log('✅ 测试数据清理成功');
              resolve(true);
            };
          } else {
            console.error('❌ 数据读取失败');
            resolve(false);
          }
        };
      };
      
      addRequest.onerror = () => {
        console.error('❌ 数据写入失败');
        resolve(false);
      };
    };
  });
}

// 测试3: 删除功能测试
function testDeleteFunction() {
  console.log('🗑️ 测试3: 删除功能测试');
  
  return new Promise((resolve) => {
    // 首先添加测试数据
    const request = indexedDB.open('NotToDoDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // 添加测试数据
      const addTransaction = db.transaction(['pyramid'], 'readwrite');
      const addStore = addTransaction.objectStore('pyramid');
      
      const testItem = {
        id: 'test-delete-item',
        text: '待删除项目',
        category: 'work',
        reflection: '测试删除',
        timestamp: Date.now(),
        logs: []
      };
      
      const addRequest = addStore.add(testItem);
      addRequest.onsuccess = () => {
        console.log('✅ 测试数据添加成功');
        
        // 模拟删除操作
        const deleteTransaction = db.transaction(['pyramid'], 'readwrite');
        const deleteStore = deleteTransaction.objectStore('pyramid');
        deleteStore.delete('test-delete-item');
        
        deleteRequest.onsuccess = () => {
          console.log('✅ 删除操作成功');
          
          // 验证数据是否真的被删除
          const verifyTransaction = db.transaction(['pyramid'], 'readonly');
          const verifyStore = verifyTransaction.objectStore('pyramid');
          const getRequest = verifyStore.get('test-delete-item');
          
          getRequest.onsuccess = () => {
            if (!getRequest.result) {
              console.log('✅ 删除验证成功 - 数据已从IndexedDB中删除');
              resolve(true);
            } else {
              console.error('❌ 删除验证失败 - 数据仍存在于IndexedDB中');
              resolve(false);
            }
          };
        };
      };
    };
  });
}

// 测试4: 编辑功能测试
function testEditFunction() {
  console.log('✏️ 测试4: 编辑功能测试');
  
  return new Promise((resolve) => {
    const request = indexedDB.open('NotToDoDB', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // 添加测试数据
      const addTransaction = db.transaction(['pyramid'], 'readwrite');
      const addStore = addTransaction.objectStore('pyramid');
      
      const testItem = {
        id: 'test-edit-item',
        text: '原始项目',
        category: 'work',
        reflection: '原始反思',
        timestamp: Date.now(),
        logs: []
      };
      
      const addRequest = addStore.add(testItem);
      addRequest.onsuccess = () => {
        console.log('✅ 测试数据添加成功');
        
        // 模拟编辑操作
        const editTransaction = db.transaction(['pyramid'], 'readwrite');
        const editStore = editTransaction.objectStore('pyramid');
        
        const updatedItem = {
          ...testItem,
          text: '编辑后项目',
          reflection: '编辑后反思'
        };
        
        const putRequest = editStore.put(updatedItem);
        putRequest.onsuccess = () => {
          console.log('✅ 编辑操作成功');
          
          // 验证数据是否真的被更新
          const verifyTransaction = db.transaction(['pyramid'], 'readonly');
          const verifyStore = verifyTransaction.objectStore('pyramid');
          const getRequest = verifyStore.get('test-edit-item');
          
          getRequest.onsuccess = () => {
            if (getRequest.result && getRequest.result.text === '编辑后项目') {
              console.log('✅ 编辑验证成功 - 数据已从IndexedDB中更新');
              resolve(true);
            } else {
              console.error('❌ 编辑验证失败 - 数据未正确更新');
              resolve(false);
            }
          };
        };
      };
    };
  });
}

// 测试5: 响应式设计测试
function testResponsiveDesign() {
  console.log('📱 测试5: 响应式设计测试');
  
  // 检查视口大小
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  console.log(`📏 当前视口大小: ${viewportWidth}x${viewportHeight}`);
  
  // 检查导航按钮在小屏幕上的显示
  const navButtons = document.querySelectorAll('[data-testid="nav-button"]');
  let responsiveTestPassed = true;
  
  if (viewportWidth < 768) { // 移动设备
    navButtons.forEach(button => {
      const buttonText = button.textContent;
      if (buttonText.length > 5) {
        console.warn(`⚠️ 移动设备上导航按钮文本过长: "${buttonText}"`);
        responsiveTestPassed = false;
      }
    });
  }
  
  if (responsiveTestPassed) {
    console.log('✅ 响应式设计测试通过');
  } else {
    console.error('❌ 响应式设计测试失败');
  }
  
  return responsiveTestPassed;
}

// 测试6: 标题和图标测试
function testTitleAndIcon() {
  console.log('🏷️ 测试6: 标题和图标测试');
  
  // 检查页面标题
  const pageTitle = document.title;
  if (!pageTitle || pageTitle === '') {
    console.error('❌ 页面标题未设置');
    return false;
  }
  console.log(`✅ 页面标题: "${pageTitle}"`);
  
  // 检查favicon
  const favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    console.error('❌ Favicon未设置');
    return false;
  }
  console.log('✅ Favicon已设置');
  
  // 检查meta描述
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription || !metaDescription.content) {
    console.error('❌ Meta描述未设置');
    return false;
  }
  console.log(`✅ Meta描述: "${metaDescription.content.substring(0, 50)}..."`);
  
  return true;
}

// 测试7: 导出功能测试
function testExportFunction() {
  console.log('📤 测试7: 导出功能测试');
  
  return new Promise((resolve) => {
    // 检查导出按钮是否存在
    const exportButton = document.querySelector('[data-testid="export-button"]');
    if (!exportButton) {
      console.error('❌ 导出按钮不存在');
      resolve(false);
      return;
    }
    console.log('✅ 导出按钮存在');
    
    // 检查IndexedDB是否可以打开
    const request = indexedDB.open('NotToDoDB', 1);
    request.onerror = () => {
      console.error('❌ 无法打开IndexedDB');
      resolve(false);
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      
      // 检查存储对象是否存在
      if (!db.objectStoreNames.contains('pyramid') || !db.objectStoreNames.contains('decisions')) {
        console.error('❌ IndexedDB存储对象不存在');
        resolve(false);
        return;
      }
      console.log('✅ IndexedDB存储对象存在');
      
      // 检查是否能读取数据
      const itemsTransaction = db.transaction(['pyramid'], 'readonly');
      const itemsStore = itemsTransaction.objectStore('pyramid');
      const itemsRequest = itemsStore.getAll();
      
      const decisionsTransaction = db.transaction(['decisions'], 'readonly');
      const decisionsStore = decisionsTransaction.objectStore('decisions');
      const decisionsRequest = decisionsStore.getAll();
      
      Promise.all([itemsRequest, decisionsRequest]).then(() => {
        console.log('✅ 数据读取成功');
        console.log(`📊 金字塔数据: ${itemsRequest.result.length} 条`);
        console.log(`📊 决策数据: ${decisionsRequest.result.length} 条`);
        
        // 检查数据是否可以序列化
        try {
          const data = {
            items: itemsRequest.result || [],
            decisions: decisionsRequest.result || [],
            exportDate: new Date().toISOString()
          };
          
          const jsonString = JSON.stringify(data, null, 2);
          console.log('✅ 数据序列化成功');
          console.log(`📄 JSON大小: ${jsonString.length} 字符`);
          
          // 检查Blob创建
          const blob = new Blob([jsonString], {type: 'application/json'});
          console.log('✅ Blob创建成功');
          console.log(`📦 Blob大小: ${blob.size} 字节`);
          
          resolve(true);
        } catch (error) {
          console.error('❌ 数据序列化失败:', error);
          resolve(false);
        }
      }).catch(error => {
        console.error('❌ 数据读取失败:', error);
        resolve(false);
      });
    };
  });
}

// 运行所有测试
async function runAllTests() {
  console.log('🚀 开始运行所有测试用例...');
  
  const results = {
    basicFunctionality: await testBasicFunctionality(),
    dataStorage: await testDataStorage(),
    deleteFunction: await testDeleteFunction(),
    editFunction: await testEditFunction(),
    responsiveDesign: testResponsiveDesign(),
    titleAndIcon: testTitleAndIcon(),
    exportFunction: await testExportFunction()
  };
  
  console.log('📊 测试结果汇总:');
  console.table(results);
  
  const passedTests = Object.values(results).filter(result => result === true).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`🎯 测试完成: ${passedTests}/${totalTests} 通过`);
  
  if (passedTests === totalTests) {
    console.log('🎉 所有测试通过！应用可以安全推送。');
  } else {
    console.error('❌ 部分测试失败，请检查问题后再推送。');
  }
  
  return results;
}

// 自动运行测试
runAllTests();